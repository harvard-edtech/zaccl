const TaskQueue = require('./TaskQueue');
const Mutex = require('./Mutex');

/**
 * Class that contains a throttle and daily limit rule
 * @author Grace Whitney
 */
class Throttle {
  /**
   * Create a new Rule instance
   * @author Grace Whitney
   * @param {number} [dequeueIntervalMS] - the throttle interval
   * @param {number} [maxRequestsPerDay] - the daily call limit
   */
  constructor(opts) {
    const {
      dequeueIntervalMS,
      maxRequestsPerDay,
    } = opts;

    // Store a rule mutex for safe operations
    this._mutex = new Mutex();
    // Store a throttled task queue
    this._queue = (dequeueIntervalMS ? new TaskQueue(dequeueIntervalMS) : null);
    // Store the daily call limit
    this._maxRequestsPerDay = maxRequestsPerDay;
    // Initialize remaining allowed calls to total allowed calls
    this._dailyTokensRemaining = maxRequestsPerDay;

    // instantiate Datetime object and set to next UTC (GMT) midnight
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);
    this._resetAfter = midnight;

    // Store whether rule has limits
    this.hasDailyLimit = !!maxRequestsPerDay;
    this.hasRateLimit = !!dequeueIntervalMS;
  }

  /**
   * Increments daily token reservoir by one if limited, unless at maximum value
   * @author Grace Whitney
   */
  async incrementDailyTokens() {
    await this._checkForReset();
    const unlock = await this._mutex.lock();
    if (
      this._dailyTokensRemaining
      && this._dailyTokensRemaining < this._maxRequestsPerDay
    ) {
      this._dailyTokensRemaining += 1;
    }
    unlock();
  }

  /**
   * Decrements daily token reservoir by one if limited, unless at zero
   * @author Grace Whitney
   */
  async decrementDailyTokens() {
    await this._checkForReset();
    const unlock = await this._mutex.lock();
    if (this.hasDailyLimit && this._dailyTokensRemaining > 0) {
      this._dailyTokensRemaining -= 1;
    }
    unlock();
  }

  /**
   * Sets daily token reservoir to empty, if limited
   * @author Grace Whitney
   */
  async emptyTokenReservoir() {
    const unlock = await this._mutex.lock();
    if (this.hasDailyLimit) {
      this._dailyTokensRemaining = 0;
    }
    unlock();
  }

  /**
   * Sets resetAfter attribute to a new timestamp
   * @author Grace Whitney
   * @param {object} newResetAfter - DateTime object of the new reset timestamp
   */
  async updateResetAfter(newResetAfter) {
    const unlock = await this._mutex.lock();
    this._resetAfter = newResetAfter;
    unlock();
  }

  /**
   * Checks whether the current time is after the resetAfter. If so, resets the
   *  daily token reservoir and updates the resetAfter timestamp
   * @author Grace Whitney
   */
  async _checkForReset() {
    const unlock = await this._mutex.lock();
    // Perform daily counter arithmetic if necessary
    if (this.hasDailyLimit && this._resetAfter < Date.now()) {
      this._dailyTokensRemaining = this._maxRequestsPerDay;
      // Add 24 hours until resetAfter is in the future
      while (this._resetAfter < Date.now()) {
        this._resetAfter.setTime(
          this._resetAfter.getTime() + (86400 * 1000)
        );
      }
    }
    unlock();
  }

  /**
   * Gets current daily tokens remaining
   * @author Grace Whitney
   * @returns {number} the current daily tokens remaining
   */
  async getDailyTokensRemaining() {
    await this._checkForReset();
    return this._dailyTokensRemaining;
  }

  /**
   * If rate limited, pauses the throttled queue until the given time
   * @param  {object} time - DateTime object of timestamp at which to resume
   *  queue execution
   */
  async pauseQueueUntil(time) {
    if (this.hasRateLimit) {
      this._queue.pauseUntil(time);
    }
  }

  /**
   * If the object is rate limited, adds a task to the throttled queue.
   *  Otherwise, runs the task immediately
   * @param {object} opts - the object containing all options
   * @param {function} task - the task to be added to the queue
   * @param {boolean} [highPriority=false] - the priority of the task
   * @param {boolean} [addToFrontOfLine=false] - whether the task should skip
   *   to the front of the queue
   */
  async addTaskToQueue(opts) {
    const { task } = opts;

    if (this.hasRateLimit) {
      await this._queue.add(opts);
    } else {
      await task();
    }
  }
}

module.exports = Throttle;