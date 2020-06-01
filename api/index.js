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

    /* --------------------------- Store the Rule --------------------------- */
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
   * @param {boolean} [highPriority=false] - the priority of the endpoint call
   */
  async _visitEndpoint(opts) {
    const {
      path,
      params,
      highPriority,
    } = opts;

    const method = opts.method ? opts.method.toUpperCase() : 'GET';

    // Look up throttle rule for endpoint
    const {
      regexp,
      queue,
      dailyTokensRemaining,
    } = this.ruleMap.lookup({ path, method });

    // If daily limit has been reached, reject request
    if (dailyTokensRemaining === 0) {
      throw new Error(
        'The maximum daily call limit for this tool has been reached. Please try again tomorrow.'
      );
    }

    // Variable to store sendRequest response, will be returned
    let response;

    // Recursive function that calls sendZoomRequest with error handling
    const getResponse = async () => {
      /* --------------------------- Send Request --------------------------- */
      response = await this.sendZoomRequest({
        path,
        method,
        params,
        key: this.key,
        secret: this.secret,
      });

      const { status, headers } = response;

      /* -------------------------- Error Handling ---------------------------*/
      if (status === 429) {
        // On daily limit error, clear queue, pause endpoint, and reject request
        if (headers['X-RateLimit-Type'] === 'daily') {
          queue.clear();
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
        // On rate limit error, retry request with exponential backoff
        } else if (headers['X-RateLimit-Type'] === 'rate') {
          // If an earlier error has already paused the queue, resubmit request
          //   with high priority
          if (queue.isPaused) {
            await queue.add(getResponse, { priority: 2 });
          } else {
            // Otherwise, pause the queue and retry this request until success
            queue.pause();
            let backoff = 10;
            while (
              response.status === 429
              && response.headers['X-RateLimit-Type'] === 'rate'
            ) {
              const b = backoff;
              await new Promise((r) => { setTimeout(r, b); });
              backoff *= 2;
              response = await this.sendZoomRequest({
                path,
                method,
                params,
                key: this.key,
                secret: this.secret,
              });
            }

            // On success, restart queue
            queue.resume();
          }
        }
      }
    };

    // Add request to throttled queue with specified priority
    await queue.add(getResponse, { priority: highPriority ? 0 : 1 });
    return response;
  }
}

module.exports = API;
