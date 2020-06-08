/**
 * API class that sends request to the Zoom API, optionally adhering to throttle
 *   limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

const defaultSendZoomRequest = require('./sendZoomRequest');
const RuleMap = require('../helpers/ruleMap');
const templateToRegExp = require('../helpers/templateToRegExp');
const ZACCLError = require('../ZACCLError');
const { DAILY_LIMIT_ERROR } = require('../ERROR_CODES');

// Constants
const msBACKOFF = 10; // milliseconds of backoff after rate-limited request

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

    const method = (opts.method ? opts.method.toUpperCase() : 'GET');

    /**
     * Reset a rule's daily values if necessary
     * @param  {string} endpoint - the endpoint of the rule to be updated
     */
    const checkForReset = (ruleObj) => {
      // Find rule in ruleMap
      const { rule } = ruleObj;

      // Perform daily counter arithmetic if necessary
      if (rule.maxRequestsPerDay) {
        // Check if we need to update daily counter
        if (rule.resetAfter < Date.now()) {
          rule.dailyTokensRemaining = rule.maxRequestsPerDay;
          // Add 24 hours until resetAfter is in the future
          while (rule.resetAfter < Date.now()) {
            rule.resetAfter.setTime(
              rule.resetAfter.getTime() + (86400 * 1000)
            );
          }
          // If queue is unthrottled, re-throttle
          if (rule.queue.isPaused) {
            rule.queue.start();
          }
        }
      }
    };

    // Look up throttle rule for path and method
    const rule = this.ruleMap.lookup({ path, method });
    const { queue } = rule;

    // Variable to store sendRequest response, will be returned
    let response;

    // Recursive function that calls sendZoomRequest with error handling
    const getResponse = async () => {
      /* ----------------- Check and update daily tokens -------------------- */
      // Acquire mutex
      let unlock = await rule.mutex.lock();

      checkForReset({ rule });
      const { dailyTokensRemaining } = rule;
      if (dailyTokensRemaining === 0) {
        throw new ZACCLError({
          message: 'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
          code: DAILY_LIMIT_ERROR,
        });
      }
      // Decrement tokens on dequeue, protected by mutex
      if (dailyTokensRemaining > 0) {
        rule.dailyTokensRemaining -= 1;
      }

      // Unlock mutex
      unlock();

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
          if (queue === this.ruleMap.default.queue) {
            throw new ZACCLError({
              message: `We received an unexpected daily limit error. Please add a throttle rule for the endpoint ${path}.`,
              code: DAILY_LIMIT_ERROR,
            });
          } else {
            queue.purge(new ZACCLError({
              message: 'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
              code: DAILY_LIMIT_ERROR,
            }));
            // Empty token reservoir
            rule.dailyTokensRemaining = 0;
            // Update resetAfter
            const resetAfter = headers['Retry-After'];
            if (resetAfter) {
              rule.resetAfter = new Date(resetAfter);
            }

            throw new ZACCLError({
              message: 'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
              code: DAILY_LIMIT_ERROR,
            });
          }
        // On rate limit error, pause queue and resubmit request
        } else if (headers['X-RateLimit-Type'] === 'rate') {
          // Increment daily tokens on failed request
          unlock = await rule.mutex.lock();
          rule.dailyTokensRemaining += 1;
          unlock();
          // Pause the queue and resume after delay, if not already paused
          if (!queue.isPaused) {
            queue.pause();
            const now = new Date();
            const resume = new Date(now.getTime() + msBACKOFF);
            queue.resumeAt(resume);
          }
          await queue.add({
            task: getResponse,
            addToFrontOfLine: true,
          });
        }
      }
    };

    // Check daily tokens before adding to the queue
    checkForReset({ rule });
    if (rule.dailyTokensRemaining === 0) {
      throw new ZACCLError({
        message: 'The maximum daily call limit for this tool has been reached. Please try again tomorrow.',
        code: DAILY_LIMIT_ERROR,
      });
    }
    // Add request to throttled queue with specified priority
    await queue.add({ task: getResponse.bind(this), highPriority });
    return response;
  }
}

module.exports = API;
