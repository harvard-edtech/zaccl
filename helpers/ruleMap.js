const { default: PQueue } = require('p-queue');

/**
 * Class for storing throttle and daily limit rules
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
    let innerMap;
    if (this.map.has(method)) {
      innerMap = this.map.get(method);
    } else {
      innerMap = new Map();
      this.map.set(method, innerMap);
    }

    // throw an error on duplicate rule
    if (innerMap.has(regexp)) {
      throw new Error(
        'A rule for this path already exists. You may not define duplicate rules.'
      );
    }
    // otherwise, add rule to map
    innerMap.set(regexp, rule);
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

    // if the method is not in the map, return default directly
    if (!this.map.has(method)) {
      return defaultRule;
    }

    // iterate through method map keys, looking for regexp match
    const innerMap = this.map.get(method);
    innerMap.keys().forEach((regexp) => {
      // on match, update and return rule object
      if (regexp.test(path)) {
        const rule = innerMap.get(regexp);
        // perform daily counter arithmetic if necessary
        if (rule.maxRequestsPerDay) {
          // check if we need to reset daily counter
          const midnight = (new Date()).setHours(0, 0, 0, 0);
          if (rule.timeLastAccessed < midnight) {
            rule.dailyTokensRemaining = rule.maxRequestsPerDay;
          }
          rule.timeLastAccessed = Date.now();
        }
        // shallow copy rule to return
        const returnedRule = { ...rule };
        // decrement daily tokens if necessary
        if (rule.maxRequestsPerDay && rule.dailyTokensRemaining > 0) {
          rule.dailyTokensRemaining -= 1;
        }
        return returnedRule;
      }
    });
  }
}

module.exports = RuleMap;
