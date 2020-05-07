/**
 * Class for storing throttle rules
 * @author Grace Whitney
 */

class RuleMap {
  constructor() {
    // Stores a map from method -> (map from path regex -> throttler)
    this.map = new Map();
  }

  /**
   * Add a new rule to the map
   */
  addRule(opts) {

  }

  /**
   * Look up an endpoint and return any matching throttle rule
   * @param {string} method - method of endpoint
   * @param {string} path - path of template
   */
  lookup(method, path) {

  }

  /**
   * Return rule map (for testing purposes)
   */
  getMap() {
    return this.map;
  }
}

module.exports = RuleMap;
