const { default: PQueue } = require('p-queue');

/**
 * Class for storing throttle rules
 * @author Grace Whitney
 */

class RuleMap {
  constructor() {
    // Stores a map from method -> (map from path regex -> rule object)
    this.map = new Map();
    // Default unthrottled queue for non-rate-limited endpoints
    this.unthrottled = new PQueue();
  }

  /**
   * Add a new rule to the map
   * @author Grace Whitney
   * @param {object} regexp - regexp object of endpoint path template
   * @param {string} method - method of endpoint
   * @param [maxRequestsPerInterval=unlimited] - the maximum number of
   *   requests allowed each rate limit interval
   * @param {number} [millisecondsPerInterval=1000] - the milliseconds per
   *   rate interval
   * @param {number} [maxRequestsPerDay=unlimited] - the maximum number of
   *   requests allowed each day
   * @returns
   */
  store(opts) {
    const {
      regexp,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    } = opts;

    // case insensitive by method
    const method = opts.method.toUpperCase();

    // create new throttler if endpoint is rate limited,
    //  otherwise use the default queue
    const queue = maxRequestsPerInterval
      ? new PQueue({
        intervalCap: maxRequestsPerInterval,
        interval: millisecondsPerInterval,
      })
      : this.unthrottled;

    // Rule object holds queue, daily tokens, and timestamp of last lookup
    const rule = {
      queue,
      maxRequestsPerDay,
      dailyTokensRemaining: maxRequestsPerDay,
      timeLastAccessed: Date.now(),
    };

    // add rule to nested map of the method, with the path regexp as its key
    let methodMap;
    if (this.map.has(method)) {
      methodMap = this.map.get(method);
    } else {
      methodMap = new Map();
      this.map.set(method, methodMap);
    }

    // throw an error on duplicate rule
    if (methodMap.has(regexp)) {
      throw new Error(
        'A rule for this path already exists. You may not define duplicate rules.'
      );
    }
    // add rule to map
    methodMap.set(regexp, rule);
  }

  /**
   * Look up an endpoint and return any matching throttle queue,
   *   or the unthrottled queue if there's no match
   * @author Grace Whitney
   * @param {string} method - method of endpoint to look up
   * @param {string} path - path of endpoint to look up
   * @returns {object} rule object for given endpoint if it exists,
   *    or default unthrottled rule
   */
  lookup(method, path) {
    // default rule to return if no match is found
    const defaultRule = {
      queue: this.unthrottled,
      maxRequestsPerDay: null,
      dailyTokensRemaining: null,
      timeLastAccessed: Date.now(),
    };

    if (!this.map.has(method)) {
      return defaultRule;
    }

    this.map.get(method).forEach((rule, regexp) => {
      if (regexp.test(path)) {
        if (rule.maxRequestsPerDay) {
          const updatedRule = rule;
          // check if we need to reset daily counter
          const midnight = new Date();
          midnight.setHours(0, 0, 0, 0);
          if (rule.timeLastAccessed < midnight) {
            updatedRule.dailyTokensRemaining = rule.maxRequestsPerDay;
          }
          // update timestamp
          updatedRule.timeLastAccessed = Date.now();
          this.map.set(regexp, updatedRule);
          return updatedRule;
        }
        return rule;
      }
    });
  }
}

module.exports = RuleMap;
