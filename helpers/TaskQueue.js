const Mutex = require('./Mutex');

class TaskQueue {
  /**
   * Create a new TaskQueue
   * @author Gabe Abrams
   * @author Grace Whitney
   * @param {number} dequeueIntervalMS - the number of milliseconds to wait
   *   between dequeue operations
   */
  constructor(dequeueIntervalMS) {
    // Create a mutex that must be locked to edit prioritizedTasks
    this.mutex = new Mutex();

    // Start with an empty task list
    this.prioritizedTasks = []; // [{ highPriority, task, onErr }, ...]

    // Store the interval
    this.dequeueIntervalMS = dequeueIntervalMS;

    // Store whether the queue is paused
    this.isPaused = false;

    // Start execution
    this.start();
  }

  /**
   * Start regular execution of tasks
   * @author Gabe Abrams
   */
  start() {
    // Start a task that continuously performs tasks on the interval
    this.intervalId = setInterval(() => {
      this._attemptTask();
    }, this.dequeueIntervalMS);

    this.isPaused = false;
  }

  /**
   * Stop regular execution of tasks
   * @author Gabe Abrams
   */
  pause() {
    clearInterval(this.intervalId);
    this.isPaused = true;
  }

  /**
   * Immediately resume queue execution after a certain timestamp
   * @author Grace Whitney
   * @param { object } time - DateTime object of timestamp at which to resume
   */
  async resumeAt(time) {
    // If queue is not currently paused, do nothing
    if (!this.isPaused) {
      return;
    }
    if (time > Date.now()) {
      await new Promise((r) => { setTimeout(r, time - Date.now()); });
    }
    this.isPaused = false;
    // Immediately dequeue one task, then begin new execution interval.
    this._attemptTask();
    this.start();
  }

  /**
   * Attempt to dequeue and execute a task
   * @author Gabe Abrams
   * @async
   */
  async _attemptTask() {
    // If no tasks, just return
    if (this.prioritizedTasks.length === 0) {
      return;
    }

    // Lock
    const unlock = await this.mutex.lock();

    let nextTask;
    try {
      // Get the next task from the list
      // > Start with the first task, whether it's high priority or low priority
      nextTask = this.prioritizedTasks[0].task;
      let nextTaskIndex = 0;
      // > Search for a high priority task
      for (let i = 0; i < this.prioritizedTasks.length; i++) {
        const { highPriority, task } = this.prioritizedTasks[i];

        if (highPriority) {
          // Found a high priority task! Use this one
          nextTask = task;
          nextTaskIndex = i;
          break;
        }
      }
      // > Remove the task from the list
      this.prioritizedTasks.splice(nextTaskIndex, 1);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Encountered an error while dequeuing the next task:', err);
      return;
    } finally {
      unlock();
    }

    // Perform the task
    nextTask();
  }

  /**
   * Purge the whole queue with a specific error. This function might throw
   *   an error.
   * @author Gabe Abrams
   * @param {ZACCLError} err - the error to apply to all tasks
   */
  async purge(err) {
    // If no tasks, just return
    if (this.prioritizedTasks.length === 0) {
      return;
    }

    // Lock
    const unlock = await this.mutex.lock();

    try {
      // Purge tasks one by one
      this.prioritizedTasks.forEach((taskItem) => {
        const { onErr } = taskItem;

        // Pass along the error
        onErr(err);
      });

      // Empty the queue
      this.prioritizedTasks = [];
    } finally {
      unlock();
    }
  }

  /**
   * Perform a task when the queue permits
   * @author Gabe Abrams
   * @async
   * @param {function} task - the task to perform
   * @param {boolean} [highPriority] - true if this task is higher priority
   * @param {boolean} [addToFrontOfLine] - true if the task should be added
   *   to the front of the line
   */
  async add(options) {
    // Deconstruct
    const {
      task,
      highPriority,
      addToFrontOfLine,
    } = options;

    // Create a promise that queues the task
    //   and resolves when the task is finished
    const taskFinished = new Promise((onFinish, onErr) => {
      // Create a meta-task that performs the task then calls handlers
      const metaTask = async () => {
        try {
          const results = await task();

          // Done! Call handler
          onFinish(results);
        } catch (err) {
          // Call error handler
          onErr(err);
        }
      };

      // Create an asynchronous script inside the promise for simpler code
      (async () => {
        // Lock the task list
        const unlock = await this.mutex.lock();

        // Create a task item
        const taskItem = {
          highPriority,
          onErr,
          task: metaTask,
        };

        // Add this task to the list
        if (addToFrontOfLine) {
          this.prioritizedTasks.unshift(taskItem);
        } else {
          this.prioritizedTasks.push(taskItem);
        }

        // Unlock the mutex
        unlock();
      })();
    });

    // Wait for task to execute
    return taskFinished;
  }
}

module.exports = TaskQueue;
