/**
 * Standard mutex for concurrency control
 * @author Gabe Abrams
 */

const AsyncMutex = require('async-mutex').Mutex;

class Mutex {
  constructor() {
    this._mutex = new AsyncMutex();
  }

  /**
   * Lock the mutex (resolves when the mutex is locked)
   * @author Gabe Abrams
   * @return {function} function to call to release the lock
   */
  async lock() {
    // Lock the mutex and store the unlock function
    return this._mutex.acquire();
  }
}

module.exports = Mutex;
