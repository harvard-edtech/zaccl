const assert = require('assert');
const timekeeper = require('timekeeper');

// Import helpers
const genStubZoomRequest = require('./helpers/stubZoomRequest');
const testDailyLimit = require('./helpers/testDailyLimit');

// Import constants
const THROTTLE_CONSTANTS = require('../../constants/THROTTLE');

// Import class to test
const API = require('../../API');

// TODO: Fill in tests
describe('API', async function () {
  // Functionality tests
  it('Visits the correct endpoint', async function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    const ret = await testAPI._visitEndpoint({ path: '/unthrottled' });
    // Successful call to stubZoomRequest returns its parameters
    assert.equal(ret.status, 201, 'Unthrottled endpoint unsuccessful');
    assert.deepEqual(
      ret.body,
      {
        key: 'fakeKey',
        secret: 'fakeSecret',
        path: '/unthrottled',
        method: 'GET',
      },
      'API did not pass correct parameters to sendZoomRequest'
    );
  });

  it('Is case-insensitive', async function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    // Don't capitalize method
    const ret = await testAPI._visitEndpoint({
      path: '/unthrottled',
      method: 'Post',
    });
    // Successful call to stubZoomRequest returns its parameters
    assert.equal(ret.status, 201, 'Unthrottled endpoint unsuccessful');
    assert.deepEqual(
      ret.body,
      {
        key: 'fakeKey',
        secret: 'fakeSecret',
        path: '/unthrottled',
        method: 'POST',
      },
      'API did not pass correct parameters to sendZoomRequest'
    );
  });

  it('Adds default rules by default', function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    try {
      // Duplicate rule will throw error
      testAPI._addRule({
        template: '/meetings/{meetingId}/recordings',
        method: 'GET',
        maxRequestsPerSecond: 90,
      });
      throw new Error('Default rules were not added');
    } catch (err) {
      assert.equal(
        err.message,
        'A throttle rule for this path already exists. You may not define duplicate rules.',
        'Unexpected error occurred'
      );
    }
  });

  it('Omits default rules when specified', function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      dontUseDefaultThrottleRules: true,
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    // Duplicate rule will throw an error
    testAPI._addRule({
      template: '/meetings/{meetingId}/recordings',
      method: 'GET',
      maxRequestsPerSecond: 90,
    });
  });

  // Daily limit tests
  it('Enforces a daily limit rule', async function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    // Add rule to test
    testAPI._addRule({
      template: '/endpoint/{groupID}/{userID}',
      method: 'GET',
      maxRequestsPerDay: 5,
    });

    try {
      await testDailyLimit({
        api: testAPI,
        path: '/endpoint/g1/u1',
        method: 'GET',
        callIters: 5,
      });
    } catch (err) {
      throw new Error('API canceled queue prematurely');
    }

    try {
      await testAPI._visitEndpoint({ path: '/endpoint/g1/u1' });
      const throttle = testAPI.throttleMap.getThrottle({
        path: '/endpoint/g1/u1',
        method: 'GET',
      });
      const tokens = await throttle.getDailyTokensRemaining();
      throw new Error(`API did not cancel queue. Daily tokens remaining are ${tokens}`);
    } catch (err) {
      assert.equal(
        err.message,
        'Zoom is very busy right now. Please try this operation again tomorrow.',
        'API returned unexpected error'
      );
    }
  });

  it('Doesn\'t throttle unlimited endpoints', async function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    // Propagates error on failure
    await testDailyLimit({
      api: testAPI,
      path: './unthrottled',
      method: 'GET',
      callIters: 100, // This is arbitrary
    });
  });

  it('Throws a daily limit error for unthrottled endpoints', async function () {
    // Set up API instance with enforced daily limit
    const dailyLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [],
        totalLimit: 5,
      }),
    });

    try {
      const results = [];
      for (let i = 0; i < 6; i++) {
        results.push(
          dailyLimitTestAPI._visitEndpoint({
            path: '/unthrottled',
            method: 'GET',
          })
        );
      }
      await Promise.all(results);
      throw new Error('Daily limit error was not thrown');
    } catch (err) {
      assert.equal(
        err.message,
        'Zoom is very busy right now. Please try this operation again tomorrow.',
        `API threw unexpected error: ${err}`
      );
    }
  });

  it('Throws a daily limit error for throttled endpoints', async function () {
    // Set up API instance with enforced daily limit
    const dailyLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [],
        totalLimit: 5,
      }),
    });

    dailyLimitTestAPI._addRule({
      template: '/endpoint/{groupID}/{userID}',
      method: 'GET',
      maxRequestsPerDay: 10,
    });

    try {
      const results = [];
      for (let i = 0; i < 6; i++) {
        results.push(
          dailyLimitTestAPI._visitEndpoint({
            path: '/endpoint/g0/u0',
            method: 'GET',
          })
        );
      }
      await Promise.all(results);
      throw new Error('Daily limit error was not thrown');
    } catch (err) {
      assert.equal(
        err.message,
        'Zoom is very busy right now. Please try this operation again tomorrow.',
        `API threw unexpected error: ${err}`
      );
    }
  });

  it('resets daily counter on next request after resetAfter', async function () {
    // Set up API instance to test
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    testAPI._addRule({
      template: '/endpoint/{groupID}/{userID}',
      method: 'GET',
      maxRequestsPerDay: 2,
    });

    // Use up daily limit
    for (let i = 0; i < 2; i++) {
      await testAPI._visitEndpoint({
        path: '/endpoint/g0/u0',
        method: 'GET',
      });
    }

    // Check that subsequent call fails
    try {
      await testAPI._visitEndpoint({
        path: '/endpoint/g0/u0',
        method: 'GET',
      });
      throw new Error('API did not throw daily limit error');
    } catch (err) {
      assert.equal(
        err.message,
        'Zoom is very busy right now. Please try this operation again tomorrow.',
        'API threw unexpected error'
      );
    }

    // Travel past midnight
    const justPastMidnight = new Date();
    justPastMidnight.setUTCHours(24, 0, 0, 10);
    timekeeper.travel(justPastMidnight);

    // Check that subsequent call succeeds
    try {
      await testAPI._visitEndpoint({
        path: '/endpoint/g0/u0',
        method: 'GET',
      });
    } catch (err) {
      throw new Error(`API call failed with error ${err.message}`);
    } finally {
      timekeeper.reset();
    }
  });

  // Rate limit tests
  it('Retries one request on rate limit error', async function () {
    const rateLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [0, 3, 4, 8, 15, 16, 17, 19],
        totalLimit: 20,
      }),
      timePerRequest: 10,
    });

    const result = await rateLimitTestAPI._visitEndpoint({
      path: './endpoint/g1',
      method: 'POST',
    });
    assert.equal(result.status, 201, 'API did not return successful call');
  });

  it('Retries all requests on rate limit error', async function () {
    const rateLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [0, 3, 4, 8, 15, 16, 17, 19],
        totalLimit: 20,
      }),
      timePerRequest: 10,
    });

    let results = [];
    try {
      for (let i = 0; i < 8; i++) {
        const result = rateLimitTestAPI._visitEndpoint({
          path: './endpoint/g1',
          method: 'POST',
        });
        results.push(result);
      }
      results = await Promise.all(results);
    } catch (err) {
      throw new Error(`Received unexpected error: ${err.message}`);
    }

    assert(
      results.every((result) => { return result.status === 201; }),
      `API did not return all successful calls: ${results}`
    );
  });

  it('Enforces a rate limit rule', async function () {
    const testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({ failures: [] }),
    });

    testAPI._addRule({
      template: '/endpoint',
      method: 'POST',
      maxRequestsPerSecond: 100,
    });

    const calls = [];

    const start = new Date().getTime();
    // Make 10 calls
    for (let i = 0; i < 10; i++) {
      calls.push(
        testAPI._visitEndpoint({
          path: '/endpoint',
          method: 'POST',
        })
      );
    }
    await Promise.all(calls);
    const finish = new Date().getTime();
    // Check that finish is ~100 milliseconds after start
    assert(
      (finish - start) > 98,
      `Calls completed too quickly: ${finish - start}ms`
    );
    assert(
      (finish - start) < 110,
      `Calls completed too slowly: ${finish - start}ms`
    );
  });

  it('Pauses a queue on rate limit error', async function () {
    const rateLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [0],
      }),
    });

    rateLimitTestAPI._addRule({
      template: '/endpoint',
      method: 'POST',
      maxRequestsPerSecond: 1000,
    });

    const start = new Date().getTime();

    // First call will receive a rate limit error
    const result1 = rateLimitTestAPI._visitEndpoint({
      path: '/endpoint',
      method: 'POST',
    });
    const result2 = rateLimitTestAPI._visitEndpoint({
      path: '/endpoint',
      method: 'POST',
    });
    await Promise.all([result1, result2]);

    const finish = new Date().getTime();

    assert(
      (finish - start) > (THROTTLE_CONSTANTS.BACKOFF_MS + 2),
      'Queue did not pause sufficiently on rate limit error'
    );
  });

  it('Doesn\'t double count requests on rate limit error', async function () {
    // Set up test API with long delay
    const rateLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [0],
      }),
    });

    rateLimitTestAPI._addRule({
      template: '/endpoint',
      method: 'POST',
      maxRequestsPerSecond: 1000,
      maxRequestsPerDay: 1,
    });

    // If the call is double-counted, this will fail
    await rateLimitTestAPI._visitEndpoint({
      path: '/endpoint',
      method: 'POST',
    });
  });

  it('Sends multiple parallel requests', async function () {
    // Set up test API with long delay
    const rateLimitTestAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubZoomRequest({
        failures: [],
        timePerRequest: 50,
      }),
    });

    rateLimitTestAPI._addRule({
      template: '/endpoint',
      method: 'POST',
      maxRequestsPerSecond: 1000,
    });

    const start = new Date().getTime();

    // Make 10 endpoint calls
    const calls = [];
    for (let i = 0; i < 10; i++) {
      calls.push(
        rateLimitTestAPI._visitEndpoint({
          path: '/endpoint',
          method: 'POST',
        })
      );
    }
    await Promise.all(calls);

    const finish = new Date().getTime();

    // Ensure calls happened in parallel
    assert((finish - start) < 75, 'Requests not sent in parallel');
  });
});
