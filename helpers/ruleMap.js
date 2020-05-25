const { default: PQueue } = require('p-queue');

/**
 * Class for storing throttle and daily limit rules
 * @author Grace Whitney
 */
class RuleMap {
  /**
   * Create a new RuleMap instance
   * @author Grace Whitney
   */
  constructor() {
    // Stores a map from method -> (map from path regex -> rule object)
    this.map = {};
    // Default unthrottled rule for non-rate-limited endpoints
    this.default = {
      queue: new PQueue(),
    };
  }

  /**
   * Add a new rule to the map.
   * @author Grace Whitney
   * @param {object} opts - object containing all options
   * @param {string} opts.regexp - regexp string of endpoint path template
   * @param {string} opts.method - method of endpoint
   * @param [opts.maxRequestsPerInterval=unlimited] - the maximum number of
   *   requests allowed each rate limit interval
   * @param {number} [opts.millisecondsPerInterval=1000] - the milliseconds per
   *   rate interval
   * @param {number} [opts.maxRequestsPerDay=unlimited] - the maximum number of
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

    // instantiate new throttler with specified limits
    const queue = new PQueue({
      intervalCap: maxRequestsPerInterval,
      interval: millisecondsPerInterval || 1000,
    });

    // rule object
    const rule = {
      // throttled queue
      queue,
      // total allowed calls per day
      maxRequestsPerDay,
      // remaining allowed calls today
      dailyTokensRemaining: maxRequestsPerDay,
      // timestamp after which to reset tokens to full,
      //   initially set to next UTC midnight
      resetAfter: (new Date()).setUTCHours(24, 0, 0, 0),
    };

    // add rule to nested map of the method, with the path regexp as its key
    let innerMap;
    if (method in this.map) {
      innerMap = this.map[method];
    } else {
      innerMap = {};
      this.map[method] = innerMap;
    }

    // throw an error on duplicate rule
    if (regexp in innerMap) {
      throw new Error(
        'A rule for this path already exists. You may not define duplicate rules.'
      );
    }
    // otherwise, add rule to map
    innerMap[regexp] = rule;
  }

  /**
   * Look up an endpoint and return any matching throttle queue,
   *   or the unthrottled queue if there's no match
   * @author Grace Whitney
   * @param {string} method - method of endpoint to look up
   * @param {string} path - path of endpoint to look up
   * @returns {object} rule object for given endpoint if it exists,
   *    or default unthrottled rule, in the form:
   *    {queue, maxRequestsPerDay?, dailyTokensRemaining?, resetAfter?}
   */
  lookup(method, path) {
    // if the method is not in the map, return default directly
    if (!this.map.has(method)) {
      return this.default;
    }

    // iterate through method map keys, looking for regexp match
    const innerMap = this.map[method];
    innerMap.keys().forEach((regexp) => {
      // convert regexp string to RegExp object
      const re = new RegExp(regexp);
      // on match, update and return rule object
      if (re.test(path)) {
        const rule = innerMap[regexp];
        // perform daily counter arithmetic if necessary
        if (rule.maxRequestsPerDay) {
          // check if we need to reset daily counter
          if (rule.timeLastAccessed < rule.resetAfter) {
            rule.dailyTokensRemaining = rule.maxRequestsPerDay;
            rule.resetAfter = (new Date()).setUTCHours(24, 0, 0, 0);
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

    // if no match, return default
    return this.default;
  }

  /**
   * Change the resetAfter attribute of an existing rule object, in case of
   *    unexpected daily rate limit error
   * @author Grace Whitney
   * @param {object} opts - object containing all options
   * @param {object} opts.regexp - regexp object of endpoint path template
   * @param {string} opts.method - method of endpoint
   * @param {object} opts.resetAfter - Date object representing new reset time
   */
  updateDailyReset(opts) {
    const {
      regexp,
      method,
      resetAfter,
    } = opts;

    if (this.map.has(method) && this.map.get(method).has(regexp)) {
      this.map.get(method).get(regexp).resetAfter = resetAfter;
    } else {
      // TODO: decide whether to add daily limit to default queue
      throw new Error(
        `The rule for path ${regexp.toString()} and method ${method} does not exist and cannot be updated.`
      );
    }
  }
}

module.exports = RuleMap;
