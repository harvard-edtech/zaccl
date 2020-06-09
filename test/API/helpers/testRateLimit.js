const assert = require('assert');

const testRateLimit = async (opts) => {
  const {
    api,
    testPath,
    testMethod,
    testReqPerSecond,
    callIters,
  } = opts;

  const iters = new Array(callIters).fill({
    path: testPath,
    method: testMethod,
  });

  const start = Date.now();
  await Promise.all(iters.map(api.visitEndpoint));
  const end = Date.now();

  assert(
    (callIters / testReqPerSecond) <= ((start - end) / 1000),
    'Calls completed too quickly'
  );
};

module.exports = testRateLimit;
