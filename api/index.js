/**
 * API class that sends request to the Zoom API, optionally adhering to throttle
 *   limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

const defaultSendZoomRequest = require('./sendZoomRequest');
const RuleMap = require('../helpers/ruleMap');
const templateToRegExp = require('../helpers/templateToRegExp');

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

    // Store a copy of the api, key, and secret
    this.sendZoomRequest = sendZoomRequest || defaultSendZoomRequest;
    this.key = key;
    this.secret = secret;

    // TODO: initialize anything you might need
    // NOTE: This class should use minimal memory, should clean up after itself
    this.ruleMap = new RuleMap();
  }

  /**
   * Add a throttle rule
   * @author Grace Whitney
   * @param {object} opts - object containing all options
   * @param {string} opts.template - endpoint URL template where placeholders
   *   are surrounded by curly braces. Example: /users/{userId}/meetings
   * @param {string} opts.method - method of the endpoint
   * @param {number} [opts.maxRequestsPerInterval=unlimited] - the maximum
   *   number of requests allowed per time interval
   * @param {number} [opts.millisecondsPerInterval=1000] - the milliseconds per
   *   time interval
   * @param {number} [opts.maxRequestsPerDay=unlimited] - the maximum number of
   *   requests allowed each day
   * @returns
   */
  addRule(opts) {
    const {
      template,
      method,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    } = opts;

    const regexp = templateToRegExp(template);
    this.ruleMap.store({
      regexp,
      method,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    });
  }

  /**
   * Execute an endpoint request
   * @author Grace Whitney
   * @async
   * @param {string} path - the url path to hit
   * @param {string} [method=GET] - the https method to use
   * @param {object} [params] - the request params to include
   */
  async _visitEndpoint(opts) {
    // TODO: Visit the endpoint once the throttle has been satisfied
    // TODO: Throw daily rate limit errors if we are over the limit

    // TODO: add key and secret when sending zoom requests
    return this.sendZoomRequest({
      path: opts.path,
      method: opts.method || 'GET',
      params: opts.params,
      key: this.key,
      secret: this.secret,
    });
  }
}

module.exports = API;
