/**
 * API class that sends request to the Zoom API, optionally adhering to throttle
 *   limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

const defaultSendZoomRequest = require('./sendZoomRequest');

/* -------------------------- API Class ------------------------- */
class API {
  /**
   * Create a new API instance
   * @author Grace Whitney
   * @param {string} key - the Zoom API key to use to generate credentials
   * @param {string} secret - the Zoom API secret to use to generate credentials
   * @param {function} [sendZoomRequest=default request sender] - a function
   *   that sends requests to the Zoom API, matching the specs in
   *   /API/sendZoomRequest.js
   */
  constructor(opts) {
    const {
      key,
      secret,
      sendZoomRequest,
    } = opts;

    // Store a copy of the api
    this.sendZoomRequest = sendZoomRequest || defaultSendZoomRequest;

    // TODO: store the key and secret in the class

    // TODO: initialize anything you might need
    // NOTE: This class should use minimal memory and should clean up after itself
  }

  /**
   * Add a throttle rule
   * @author Grace Whitney
   * @param {string} template - endpoint URL template where placeholders are
   *   surrounded by curly braces. Example: /users/{userId}/meetings
   * @param {string} method - method of the endpoint
   * @param {number} [maxRequestsPerSecond=unlimited] - the maximum number of
   *   requests allowed each second
   * @param {number} [maxRequestsPerDay=unlimited] - the maximum number of
   *   requests allowed each day
   */
  addRule(opts) {
    // TODO: implement
  }

  /**
   * Execute an endpoint request
   * @author Grace Whitney
   * @async
   * @param {string} path - the url path to hit
   * @param {string} [method=GET] - the https method to use
   * @param {object} [params] - the request params to include
   */
  async visitEndpoint(opts) {
    // TODO: Visit the endpoint once the throttle has been satisfied
    // TODO: Throw daily rate limit errors if we are over the limit

    // TODO: add key and secret when sending zoom requests
    // sendZoomRequest({
    //   path: opts.path,
    //   method: opts.method,
    //   params: opts.params,
    //   key: this.key,
    //   secret: this.secret,
    // });
  }
}

module.exports = API;
