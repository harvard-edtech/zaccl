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
   * @param {number} [priority=0] - the priority of the endpoint call, where
   *    higher numbers are scheduled first
   */
  async _visitEndpoint(opts) {
    // TODO: Visit the endpoint once the throttle has been satisfied
    // TODO: Throw daily rate limit errors if we are over the limit
    const {
      path,
      params,
      priority,
    } = opts;

    const method = opts.method ? opts.method.toUpperCase() : 'GET';

    // look for corresponding throttle rule in rule map
    const {
      regexp,
      queue,
      dailyTokensRemaining,
    } = this.ruleMap.lookup({ path, method });

    if (dailyTokensRemaining === 0) {
      throw new Error(
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.'
      );
    }

    // add zoomRequest call to throttled queue of endpoint
    let response;
    await queue.add(async () => {
      response = await this.sendZoomRequest({
        path,
        method,
        params,
        key: this.key,
        secret: this.secret,
      },
      {
        priority,
      });

      const { status, headers } = response;

      // check for rate limit errors
      if (status === 429) {
        if (headers['X-RateLimit-Type'] === 'daily') {
          // clear the queue
          queue.clear();
          // prevent future calls today
          const resetAfter = headers['Retry-After'];
          this.ruleMap.pauseEndpointUntil({
            regexp,
            method,
            resetAfter,
          });
          // TODO: Should this error be different?
          throw new Error(
            'The maximum daily call limit for this tool has been reached. Please try again tomorrow.'
          );
        } else if (headers['X-RateLimit-Type'] === 'rate') {
          // TODO
        }
      }
    });

    return response;
  }
}

module.exports = API;
