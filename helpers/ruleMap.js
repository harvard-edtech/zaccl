const Mutex = require('./Mutex');
const TaskQueue = require('./TaskQueue');
const ZACCLError = require('../ZACCLError');
const { DUPLICATE_RULE_ERROR } = require('../ERROR_CODES');

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
    // Stores an object mapping method -> (map from path regex -> rule object)
    this.map = {};
    // Default unthrottled rule for non-rate-limited endpoints
    this.default = {
      queue: new TaskQueue(),
      mutex: new Mutex(),
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

    const dequeueIntervalMS = (
      maxRequestsPerInterval
        ? (millisecondsPerInterval || 1000) / maxRequestsPerInterval
        : 0
    );

    // instantiate new throttler with specified limits
    const queue = new TaskQueue(dequeueIntervalMS);
    // instantiate Datetime object and set to next UTC midnight
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);

    // create rule object
    const rule = {
      // mutex to acquire before altering rule object
      mutex: new Mutex(),
      // throttled queue
      queue,
      // total allowed calls per day
      maxRequestsPerDay,
      // remaining allowed calls today
      dailyTokensRemaining: maxRequestsPerDay,
      // timestamp after which to reset tokens to full,
      //   initially set to next UTC midnight
      resetAfter: midnight,
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
      throw new ZACCLError({
        message: 'A rule for this path already exists. You may not define duplicate rules.',
        code: DUPLICATE_RULE_ERROR,
      });
    }
    // otherwise, add rule to map
    innerMap[regexp] = rule;
  }

  /**
   * Look up an endpoint and return any matching endpoint template regexp
   * @author Grace Whitney
   * @param {string} method - method of endpoint to look up
   * @param {string} path - path of endpoint to look up
   * @returns {string} matching regexp string
   */
  lookup(opts) {
    const {
      method,
      path,
    } = opts;

    // if the method is not in the map, return default directly
    if (!this.map[method]) {
      return this.default;
    }

    // iterate through method map keys, looking for regexp match
    const innerMap = this.map[method];
    const regexps = Object.keys(innerMap);
    for (let i = 0; i < regexps.length; i++) {
      // convert regexp string to RegExp object
      const regexp = regexps[i];
      const re = new RegExp(regexp);
      // on match, return matching regexp
      if (re.test(path)) {
        return innerMap[regexp];
      }
    }

    // if no match, return default
    return this.default;
  }
}

module.exports = RuleMap;
