/**
 * Asynchronous Mutex object
 * @author Gabe Abrams
 */
declare class Mutex {
    private mutex;
    /**
     * Create a new mutex
     * @author Gabe Abrams
     */
    constructor();
    /**
     * Lock the mutex (resolves when the mutex is locked)
     * @author Gabe Abrams
     * @return function to call to release the lock
     */
    lock(): Promise<import("async-mutex/lib/MutexInterface").default.Releaser>;
}
export default Mutex;
