/**
 * API class that sends request to the Zoom API, optionally adhering to throttle
 *   limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

const defaultSendZoomRequest = require('./sendZoomRequest');
const ThrottleMap = require('../helpers/ThrottleMap');
const templateToRegExp = require('../helpers/templateToRegExp');
const ZACCLError = require('../ZACCLError');
const ERROR_CODES = require('../ERROR_CODES');

// Constants
const BACKOFF_MS = 10; // milliseconds of backoff after rate-limited request

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

    this.throttleMap = new ThrottleMap();
  }

  /**
   * Add a throttle throttle
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
   */
  addThrottle(opts) {
    const {
      template,
      method,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    } = opts;

    /* ------------------------- Store the Throttle ------------------------- */
    const regExp = templateToRegExp(template);
    this.throttleMap.store({
      regExp,
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
   * @return {object} the object returned by the endpoint request
   */
  async _visitEndpoint(opts) {
    const {
      path,
      params,
      highPriority,
    } = opts;

    const method = (opts.method ? opts.method.toUpperCase() : 'GET');

    // Look up throttle throttle for path and method
    const throttle = this.throttleMap.lookup({ path, method });

    // Variable to store sendRequest response, will be returned
    let response;

    /**
     * Wrapper for sendZoomRequest that includes error handling, for submission
     *  to the endpoint's throttled queue
     *  @author Grace Whitney
     *  @async
     */
    const getResponse = async () => {
      /* ----------------- Check and update daily tokens -------------------- */
      if ((await throttle.getDailyTokensRemaining()) === 0) {
        throw new ZACCLError({
          message: 'Zoom is very busy right now. Please try this operation again tomorrow.',
          code: ERROR_CODES.DAILY_LIMIT_ERROR,
        });
      }
      await throttle.decrementTokens();

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
        // On daily limit error, reject request, purge queue, and pause endpoint
        if (headers['X-RateLimit-Type'] === 'daily') {
          // If default queue, throw error but do not purge endpoint
          if (!throttle.hasRateLimit) {
            throw new ZACCLError({
              message: `We received an unexpected daily limit error. Please add a throttle throttle for the endpoint ${path}.`,
              code: ERROR_CODES.DAILY_LIMIT_ERROR,
            });
          } else {
            await throttle.queue.rejectAll(new ZACCLError({
              message: 'Zoom is very busy right now. Please try this operation again tomorrow.',
              code: ERROR_CODES.DAILY_LIMIT_ERROR,
            }));
            // Empty token reservoir
            await throttle.emptyTokenReservoir();
            // Update resetAfter
            const resetAfter = headers['Retry-After'];
            if (resetAfter) {
              await throttle.updateResetAfter(new Date(resetAfter));
            }

            throw new ZACCLError({
              message: 'Zoom is very busy right now. Please try this operation again tomorrow.',
              code: ERROR_CODES.DAILY_LIMIT_ERROR,
            });
          }
        // On rate limit error, pause queue and resubmit request
        } else if (headers['X-RateLimit-Type'] === 'rate') {
          // Increment daily tokens on failed request
          throttle.incrementDailyTokens();

          // Pause the queue and resume after delay, if not already paused
          const now = new Date();
          const resume = new Date(now.getTime() + BACKOFF_MS);
          throttle.pauseQueueUntil(resume);
          await throttle.addTaskToQueue({
            task: getResponse,
            addToFrontOfLine: true,
          });
        }
      }
    };

    // Check daily tokens before adding to the queue
    if (throttle.getDailyTokensRemaining() === 0) {
      throw new ZACCLError({
        message: 'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
        code: ERROR_CODES.DAILY_LIMIT_ERROR,
      });
    }
    // Add request to throttled queue with specified priority
    await throttle.addTaskToQueue({
      task: getResponse.bind(this),
      highPriority,
    });
    return response;
  }
}

module.exports = API;
