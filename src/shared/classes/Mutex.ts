/**
 * Standard mutex for concurrency control
 * @author Gabe Abrams
 */

import { Mutex as AsyncMutex } from 'async-mutex';

class Mutex {
  private mutex: AsyncMutex;

  constructor() {
    this.mutex = new AsyncMutex();
  }

  /**
   * Lock the mutex (resolves when the mutex is locked)
   * @author Gabe Abrams
   * @returns function to call to release the lock
   */
  async lock() {
    // Lock the mutex and store the unlock function
    return this.mutex.acquire();
  }
}

export default Mutex;
