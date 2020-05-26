const assert = require('assert');
// library for testing date-related functionality
const timekeeper = require('timekeeper');

// import helpers
const genStubZoomRequest = require('./helpers/stubZoomRequest');
const testDailyLimit = require('./helpers/testDailyLimit');
const testRateLimit = require('./helpers/testRateLimit');

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
      assert(false, 'API canceled queue prematurely');
    }

    try {
      await testAPI._visitEndpoint({ path: './endpoint/g1/u1' });
    } catch (err) {
      assert.equal(
        err,
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.'
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

  const throttledTestAPI = new API({
    key: 'fakeKey',
    secret: 'fakeSecret',
    sendZoomRequest: genStubZoomRequest({
      failures: [],
      totalLimit: 5,
    }),
  });

  throttledTestAPI.addRule({
    template: './endpoint/{groupID}/{userID}',
    method: 'GET',
    maxRequestsPerDay: 10,
  });

  it('Cancels a queue on daily limit error', async function () {
    // TODO: What is the intended behavior on unexpected daily limit error?
    try {
      await testDailyLimit({
        api: throttledTestAPI,
        path: './endpoint/g1/u1',
        method: 'GET',
        callIters: 9,
      });
    } catch (err) {
      assert.equal(
        err,
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.'
      );
    }
  });

  it('Resets daily count at midnight', function () {
    // TODO: Use timekeeper library to manipulate time
  });

  // Rate limit tests
  it('Enforces a rate limit rule', function () {

  });

  it('Throttles per endpoint', function () {

  });

  it('Pauses a queue on rate limit error', function () {

  });

  it('Sends multiple parallel requests', function () {

  });
});
