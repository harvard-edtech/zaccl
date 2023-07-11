// Import a lib mutex
import { Mutex as AsyncMutex } from 'async-mutex';

/**
 * Asynchronous Mutex object
 * @author Gabe Abrams
 */
class Mutex {
  private mutex: AsyncMutex;

  /**
   * Create a new mutex
   * @author Gabe Abrams
   */
  constructor() {
    this.mutex = new AsyncMutex();
  }

  /**
   * Lock the mutex (resolves when the mutex has been acquired)
   * @author Gabe Abrams
   * @return function to call to release the lock
   */
  async lock() {
    // Lock the mutex and store the unlock function
    return this.mutex.acquire();
  }
}

export default Mutex;
