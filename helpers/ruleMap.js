/**
 * Class for storing throttle rules
 * @author Grace Whitney
 */

class RuleMap {
  constructor() {
    // Stores a map from method -> (map from path regex -> throttled queue)
    this.map = new Map();
  }

  /**
   * Add a new rule to the map
   * @author Grace Whitney
   * @param {object} regexp - regexp object of endpoint path template
   * @param {string} method - method of endpoint
   * @param {object} queue - throttled queue for endpoint
   * @returns ???
   */
  store(opts) {

  }

  /**
   * Look up an endpoint and return any matching throttle queue
   * @author Grace Whitney
   * @param {string} method - method of endpoint
   * @param {string} path - path of template
   * @returns {object} throttled queue for given endpoint
   */
  lookup(method, path) {

  }
}

module.exports = RuleMap;
