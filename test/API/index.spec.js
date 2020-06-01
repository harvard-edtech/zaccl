const assert = require('assert');

// import helpers
const genStubZoomRequest = require('./helpers/stubZoomRequest');
const testDailyLimit = require('./helpers/testDailyLimit');

// import class to test
const API = require('../../api');

// TODO: Fill in tests
describe('API', async function () {
  const testAPI = new API({
    key: 'fakeKey',
    secret: 'fakeSecret',
    sendZoomRequest: genStubZoomRequest({ failures: [] }),
  });

  // Functionality tests
  it('Visits the correct endpoint', async function () {
    const ret = await testAPI._visitEndpoint({ path: '/unthrottled/u1' });
    // Successful call to stubZoomRequest returns its parameters
    assert.equal(ret.status, 201, 'Unthrottled endpoint unsuccessful');
    assert.deepEqual(
      ret.body,
      {
        key: 'fakeKey',
        secret: 'fakeSecret',
        path: '/unthrottled/u1',
        method: 'GET',
      },
      'API did not pass correct parameters to sendZoomRequest'
    );
  });

  it('Is case-insensitive', async function () {
    const ret = await testAPI._visitEndpoint({
      path: '/unthrottled/u1',
      method: 'Post',
    });
    // Successful call to stubZoomRequest returns its parameters
    assert.equal(ret.status, 201, 'Unthrottled endpoint unsuccessful');
    assert.deepEqual(
      ret.body,
      {
        key: 'fakeKey',
        secret: 'fakeSecret',
        path: '/unthrottled/u1',
        method: 'POST',
      },
      'API did not pass correct parameters to sendZoomRequest'
    );
  });

  // Daily limit tests
  it('Enforces a daily limit rule', async function () {
    // Add rule to test
    testAPI.addRule({
      template: './endpoint/{groupID}/{userID}',
      method: 'GET',
      maxRequestsPerDay: 5,
    });

    try {
      await testDailyLimit({
        api: testAPI,
        path: './endpoint/g1/u1',
        method: 'GET',
        callIters: 5,
      });
    } catch (err) {
      throw new Error('API canceled queue prematurely');
    }

    try {
      await testAPI._visitEndpoint({ path: './endpoint/g1/u1' });
      throw new Error('API did not cancel queue');
    } catch (err) {
      assert.equal(
        err.message,
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
        'API returned unexpected error'
      );
    }
  });

  it('Doesn\'t throttle unlimited endpoints', async function () {
    // Propagates error on failure
    await testDailyLimit({
      api: testAPI,
      path: './unthrottled/u1',
      method: 'GET',
      callIters: 100, // This is arbitrary
    });
  });

  const dailyLimitTestAPI = new API({
    key: 'fakeKey',
    secret: 'fakeSecret',
    sendZoomRequest: genStubZoomRequest({
      failures: [],
      totalLimit: 5,
    }),
  });

  dailyLimitTestAPI.addRule({
    template: './endpoint/{groupID}/{userID}',
    method: 'GET',
    maxRequestsPerDay: 10,
  });

  it('Cancels a queue on daily limit error', async function () {
    try {
      const results = [];
      for (let i = 0; i < 9; i++) {
        results.push(
          dailyLimitTestAPI._visitEndpoint({
            path: './endpoint/g1/u1',
            method: 'GET',
          })
        );
      }
      await Promise.all(results);
      throw new Error('Daily limit error was not thrown');
    } catch (err) {
      assert.equal(
        err.message,
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
        `API threw unexpected error: ${err}`
      );
    }
  });

  // Rate limit tests
  const rateLimitTestAPI = new API({
    key: 'fakeKey',
    secret: 'fakeSecret',
    sendZoomRequest: genStubZoomRequest({
      failures: [0, 3, 4, 8, 15, 16, 17, 19],
      totalLimit: 20,
    }),
    timePerRequest: 10,
  });

  rateLimitTestAPI.addRule({
    template: './endpoint/{groupID}',
    method: 'POST',
    maxRequestsPerDay: 10,
  });

  it('Retries one request on rate limit error', async function () {
    let result;
    try {
      result = await rateLimitTestAPI._visitEndpoint({
        path: './endpoint/g1',
        method: 'POST',
      });
    } catch (err) {
      throw new Error(`Received unexpected error: ${err.message}`);
    }

    assert.equal(result.status, 201, 'API did not return successful call');
  });

  it('Retries all requests on rate limit error', async function () {
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

  it('Enforces a rate limit rule', function () {

  });

  it('Throttles per endpoint', function () {

  });

  it('Pauses a queue on rate limit error', function () {

  });

  it('Handles combined rate and daily limit error correctly', function () {

  });

  it('Doesn\'t double count requests on rate limit error', function () {

  });

  it('Sends multiple parallel requests', function () {

  });
});
