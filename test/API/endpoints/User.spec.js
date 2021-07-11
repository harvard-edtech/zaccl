const assert = require('assert');

// import classes to test
const API = require('../../../API');

// import stub API
const genStubAPIRequest = require('../helpers/stubAPIRequest');

describe('User Endpoints', async function () {
  let testAPI;
  beforeEach(() => {
    // Create API instance
    testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubAPIRequest(),
    });
  });
  it('gets ZAKToken', async function () {
    const ret = await testAPI.user.getZAKToken({ userId: 12345 });
    assert.equal(
      ret.path,
      '/users/12345/token',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      { type: 'zak' },
      'params object does not match'
    );
  });
});
