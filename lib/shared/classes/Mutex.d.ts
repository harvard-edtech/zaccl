/**
 * Standard mutex for concurrency control
 * @author Gabe Abrams
 */
declare class Mutex {
    private mutex;
    constructor();
    /**
     * Lock the mutex (resolves when the mutex is locked)
     * @author Gabe Abrams
     * @returns function to call to release the lock
     */
    lock(): Promise<import("async-mutex/lib/MutexInterface").default.Releaser>;
}
export default Mutex;
