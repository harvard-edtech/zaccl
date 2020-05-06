const Bottleneck = require('bottleneck');

class stubZoomRequest {
  /**
   * Class that provides parameterized testing stub for sendZoomRequest
   * @author Grace Whitney
   * @param {number} throttleLimit - the max # of requests/second/endpoint
   * @param {number} dailyLimit - the max # of requests/day/endpoint
   * @param {number} timePerRequest - milliseconds of delay on each request
   */
  constructor(opts) {
    const {
      throttleLimit,
      dailyLimit,
      timePerRequest,
    } = opts;

    // store options
    this.throttleLimit = throttleLimit;
    this.dailyLimit = dailyLimit;
    this.timePerRequest = timePerRequest;
  }

  /**
   * Actual replacement for sendZoomRequest
   * @async
   * @param {string} path - the url path to hit
   * @param {string} key - the Zoom API key to use to generate credentials
   * @param {string} secret - the Zoom API secret to use to generate credentials
   * @param {string} [method=GET] - the https method to use
   * @param {object} [params] - the request params to include
   */
  async stubSendRequest(opts) {
    const {
      path,
      method,
      params,
    } = opts;

    // timeout for timePerRequest milliseconds
    await new Promise((r) => { setTimeout(r, this.timePerRequest); });

    return {
      body: {
        path,
        method,
        params,
      },
      status: 200,
      headers: {},
    };
  }
}

module.exports = stubZoomRequest;
