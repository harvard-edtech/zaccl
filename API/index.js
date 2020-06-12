/**
 * API class that sends request to the Zoom API, optionally adhering to throttle
 *   limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

 // Import classes
const ThrottleMap = require('../helpers/ThrottleMap');
const ZACCLError = require('../ZACCLError');

// Import helpers
const defaultSendZoomRequest = require('./sendZoomRequest');
const templateToRegExp = require('../helpers/templateToRegExp');

// Import constants
const ERROR_CODES = require('../ERROR_CODES');

// Import endpoints
const CloudRecording = require('./endpoints/CloudRecording');
const Meeting = require('./endpoints/Meeting');
const User = require('./endpoints/User');

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

    // Initialize endpoint categories
    this.cloudRecording = new CloudRecording({ api: this });
    this.meeting = new Meeting({ api: this });
    this.user = new User({ api: this });
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
   */
  addRule(opts) {
    const {
      template,
      method,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    } = opts;

    /* ------------------------- Store the Throttle ------------------------- */
    const regExp = templateToRegExp(template);
    this.throttleMap.addThrottle({
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
    const throttle = this.throttleMap.getThrottle({ path, method });

    // Variable to store sendRequest response, will be returned
    let response;

    /**
     * Asynchronous task wrapper for sendZoomRequest that includes error
     *   handling, for submission to the endpoint's throttled queue
     * @author Grace Whitney
     * @async
     */
    const zoomRequestTask = async () => {
      /* ----------------- Check and update daily tokens -------------------- */
      if ((await throttle.getDailyTokensRemaining()) === 0) {
        throw new ZACCLError({
          message: 'Zoom is very busy right now. Please try this operation again tomorrow.',
          code: ERROR_CODES.DAILY_LIMIT_ERROR,
        });
      }
      await throttle.decrementDailyTokens();

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
        if (headers['X-RateLimit-Type'] === 'Daily-limit') {
          await throttle.rejectAllFromQueue(new ZACCLError({
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
        // On rate limit error, pause queue and resubmit request
        } else if (headers['X-RateLimit-Type'] === 'QPS') {
          // Increment daily tokens on failed request
          throttle.incrementDailyTokens();

          // Pause the queue and resume after delay, if not already paused
          const now = new Date();
          const resume = new Date(now.getTime() + BACKOFF_MS);
          throttle.pauseQueueUntil(resume);
          await throttle.addTaskToQueue({
            task: zoomRequestTask,
            highPriority,
            addToFrontOfLine: true,
          });
        }
      }
    };

    // Check daily tokens before adding to the queue
    if ((await throttle.getDailyTokensRemaining()) === 0) {
      throw new ZACCLError({
        message: 'Zoom is very busy right now. Please try this operation again tomorrow.',
        code: ERROR_CODES.DAILY_LIMIT_ERROR,
      });
    }
    // Add request to throttled queue with specified priority
    await throttle.addTaskToQueue({
      task: zoomRequestTask.bind(this),
      highPriority,
    });
    return response;
  }
}

module.exports = API;
