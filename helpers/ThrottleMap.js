const Throttle = require('./Throttle');
const ZACCLError = require('../ZACCLError');
const ERROR_CODES = require('../ERROR_CODES');

/**
 * Class for storing rate and daily limit throttles
 * @author Grace Whitney
 */
class ThrottleMap {
  /**
   * Create a new throttleMap instance
   * @author Grace Whitney
   */
  constructor() {
    // Stores an object mapping method -> (map from path regex -> throttle)
    this.map = {};

    // Default unlimited throttle for endpoints that do not have a rule
    this.default = new Throttle();
  }

  /**
   * Add a new endpoint throttle to the map. Does not allow duplicate rules.
   * @author Grace Whitney
   * @param {object} opts - object containing all options
   * @param {string} opts.regExp - reg exp string of endpoint path template
   * @param {string} opts.method - method of endpoint
   * @param {number} [opts.maxRequestsPerInterval=unlimited] - the maximum
   *   number of requests allowed each rate limit interval
   * @param {number} [opts.millisecondsPerInterval=1000] - the milliseconds per
   *   rate interval
   * @param {number} [opts.maxRequestsPerDay=unlimited] - the maximum number of
   *   requests allowed each day
   */
  addThrottle(opts) {
    const {
      regExp,
      maxRequestsPerInterval,
      millisecondsPerInterval,
      maxRequestsPerDay,
    } = opts;

    // case insensitive by method
    const method = opts.method.toUpperCase();

    const dequeueIntervalMS = (
      maxRequestsPerInterval
        ? (millisecondsPerInterval || 1000) / maxRequestsPerInterval
        : undefined
    );

    // create new throttle instance
    const throttle = new Throttle({
      dequeueIntervalMS,
      maxRequestsPerDay,
    });

    // if method is not already in map, add it
    if (!this.map[method]) {
      this.map[method] = {};
    }

    // throw an error on duplicate throttle
    if (regExp in this.map[method]) {
      throw new ZACCLError({
        message: 'A throttle rule for this path already exists. You may not define duplicate rules.',
        code: ERROR_CODES.DUPLICATE_RULE_ERROR,
      });
    }
    // otherwise, add throttle to map
    this.map[method][regExp] = throttle;
  }

  /**
   * Look up an endpoint and return the Throttle for any matching template,
   *  or the default empty Throttle if none is found.
   * @author Grace Whitney
   * @param {string} method - method of endpoint to look up
   * @param {string} path - path of endpoint to look up
   * @returns {Throttle} Throttle object of matching endpoint template
   */
  getThrottle(opts) {
    const {
      method,
      path,
    } = opts;

    // if the method is not in the map, return default directly
    if (!this.map[method]) {
      return this.default;
    }

    // iterate through method map keys, looking for regExp match
    const innerMap = this.map[method];
    const regExps = Object.keys(innerMap);
    for (let i = 0; i < regExps.length; i++) {
      // convert regExp string to RegExp object
      const regExp = regExps[i];
      const re = new RegExp(regExp);
      // on match, return matching regexp
      if (re.test(path)) {
        return innerMap[regExp];
      }
    }

    // if no match, return default
    return this.default;
  }
}

module.exports = ThrottleMap;
