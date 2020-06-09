const genStubZoomRequest = require('./stubZoomRequest');
const API = require('../../../api');

const testDailyLimit = async (opts) => {
  const {
    path,
    method,
    callIters,
  } = opts;

  const api = opts.api || new API({
    key: 'fakeKey',
    secret: 'fakeSecret',
    sendZoomRequest: genStubZoomRequest({
      failures: [],
    }),
  });

  // call visitEndpoint callIters times
  for (let i = 0; i < callIters; i++) {
    api._visitEndpoint({ path, method });
  }
};

module.exports = testDailyLimit;
