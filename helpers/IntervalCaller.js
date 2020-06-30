/**
 * Class that calls a function on an interval
 */
class IntervalCaller {
  /**
   * Create a new IntervalCaller instance
   * @author Grace Whitney
   * @param {function} intervalFunction - function to be called on the interval
   * @param {number} intervalMS - milliseconds between each call
   */
  constructor(intervalFunction, intervalMS) {
    this.intervalFunction = intervalFunction;
    this.intervalMS = intervalMS;
  }

  /**
   * Starts interval, erasing previous interval. Makes first call immediately.
   * @param {function} [resetFunction] - if provided, this function will be
   *   called instead of this.intervalFunction for the first call iteration.
   */
  beginInterval(resetFunction) {
    // Remove previous interval
    clearInterval(this.intervalId);
    // Call resetCall if provided, otherwise call this.call
    if (resetFunction) {
      resetFunction();
    } else {
      this.intervalFunction();
    }
    // Set interval on which to make a call
    this.intervalId = setInterval(
      () => { this.intervalFunction(); },
      this.intervalMS
    );
  }
}

module.exports = IntervalCaller;
