/**
 * Class that keeps track of throttle limits and queues requests
 *   while adhering to throttle limits
 * @author Grace Whitney
 * @author Gabe Abrams
 */

// Import API
const defaultAPI = require('.');

// Class
class Throttler {
  /**
   * Create a new Throttler instance
   * @author Grace Whitney
   * @param {ZACCL API} [api=default API at /api/index.js] - a custom API
   *   function to use instead of the default one
   */
  constructor(api) {
    // Store a copy of the api
    this.api = api || defaultAPI;

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
   * @param {object} opts - the same options for /api/index.js
   */
  async visitEndpoint(opts) {
    // TODO: Visit the endpoint once the throttle has been satisfied
    // TODO: Throw daily rate limit errors if we are over the limit
  }
}

module.exports = Throttler;
