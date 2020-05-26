/**
 * Function that generates parameterized testing stub for sendZoomRequest
 * @author Grace Whitney
 * @param {number[]} failures - index array of requests to fail on
 * @param {number} [totalLimit] - index starting on which all requests fail
 * @param {number} [timePerRequest=0] - milliseconds of delay on each request
 * @returns {function} parameterized stub for sendZoomRequest
 */
const genStubZoomRequest = (opts) => {
  const {
    failures,
    totalLimit,
  } = opts;

  const timePerRequest = opts.timePerRequest || 0;

  // incremented on each call to stub function
  let callIndex = 0;

  /**
   * Actual replacement for sendZoomRequest
   * @async
   * @author Grace Whitney
   * @param {string} path - the url path to hit
   * @param {string} key - the Zoom API key to use to generate credentials
   * @param {string} secret - the Zoom API secret to use to generate credentials
   * @param {string} [method=GET] - the https method to use
   * @param {object} [params] - the request params to include
   * @return {object} fake sendZoomRequest return object
   */
  return async (stubOpts) => {
    const {
      key,
      secret,
      path,
    } = stubOpts;

    const currentIndex = callIndex;
    callIndex += 1;

    // timeout for timePerRequest milliseconds
    await new Promise((r) => { setTimeout(r, timePerRequest); });

    let body;
    let status;
    let headers;

    // check whether call index is a specified failure
    if (failures.includes(currentIndex)) {
      status = 429;
      headers = {};
      body = {
        code: 429,
        message: 'You have reached the maximum per-second rate limit for this API. Try again later.',
      };
    // check if call index is over total specified limit
    } else if (totalLimit && callIndex >= totalLimit) {
      status = 429;
      headers = {
        'x-RateLimit-Limit': totalLimit,
        'Retry-After': null,
      };
      body = {
        code: 429,
        message: 'You have reached the maximum daily rate limit for this API. Refer to the response header for details on when you can make another request.',
      };
    // otherwise return success
    } else {
      status = 201;
      headers = {
        'x-RateLimit-Limit': totalLimit,
        'x-RateLimit-Remaining': totalLimit - currentIndex,
      };
      // successful call returns its arguments for testing purposes
      body = {
        key,
        secret,
        path,
        method: stubOpts.method || 'GET',
      };
    }

    return {
      body,
      status,
      headers,
    };
  };
};

module.exports = genStubZoomRequest;
