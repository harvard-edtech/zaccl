const genStubZoomRequest = require('./stubZoomRequest');
const API = require('../../../API');

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
  const calls = [];
  for (let i = 0; i < callIters; i++) {
    calls.push(api._visitEndpoint({ path, method }));
  }
  await Promise.all(calls);
};

module.exports = testDailyLimit;
