const assert = require('assert');

// Import class to test
const TaskQueue = require('../../helpers/TaskQueue');

describe('helpers > TaskQueue', async function () {
  it('Resolves add method once task is complete', async function () {
    const queue = new TaskQueue(1);

    let foo;
    const task = async () => {
      // Timeout for 10 milliseconds
      await new Promise((r) => { setTimeout(r, 10); });
      foo = 'bar';
      return 'baz';
    };

    const result = await queue.add({ task });
    assert.equal(foo, 'bar', 'add method resolved before task completed');
    assert.equal(result, 'baz', 'add method did not return result of task');
  });

  it('Runs all tasks added to a queue', async function () {
    const queue = new TaskQueue(5);
    const results = new Array(10).fill(false);
    const tasks = [];

    // For each array element, create a task that sets it to true and add the
    //  task to the queue
    for (let i = 0; i < 10; i++) {
      const task = () => {
        results[i] = true;
      };
      tasks.push(queue.add({ task }));
    }

    // Wait for all tasks to complete, and check if all array elements are true
    await Promise.all(tasks);
    assert(results.every((e) => { return e; }), 'not all tasks completed');
  });

  it('Rejects all pending tasks', async function () {
    const queue = new TaskQueue(5);
    let count = 0;
    const tasks = [];

    // Task rejects queue once counter hits 5, so remaining 5 tasks will reject
    const task = () => {
      count += 1;
      if (count === 5) {
        queue.rejectAll(new Error('Queue rejected'));
      }
    };

    for (let i = 0; i < 10; i++) {
      tasks.push(queue.add({ task }));
    }

    try {
      await Promise.all(tasks);
      throw new Error('Queue did not reject');
    } catch (err) {
      assert.equal(err.message, 'Queue rejected', 'Unexpected error occurred');
      assert.equal(count, 5, 'Wrong number of tasks completed');
    }
  });

  it('Does not introduce unnecessary delay', async function () {
    // Create queue with long delay interval
    const queue = new TaskQueue(40);
    // Wait 1 ms, so that we are definitely after beginning of first interval
    await new Promise((r) => { setTimeout(r, 1); });

    const start = Date.now();
    // Add task to queue
    const result = await queue.add({ task: () => { return 42; } });
    const finish = Date.now();

    // Ensure we did not wait to complete task
    assert(finish - start < 5, 'Queue introduced unnecessary delay');
    assert.equal(result, 42, 'Task did not complete properly');
  });

  it('Pauses the queue until a certain time', async function () {
    // Create queue to test, with short interval
    const queue = new TaskQueue(1);
    // Pause queue for 10 ms
    const start = Date.now();
    const pauseEnds = new Date(start + 10);
    queue.pauseUntil(pauseEnds);
    // Add a task that returns current time to queue
    const executionTime = await queue.add({
      task: () => { return Date.now(); },
    });
    // Ensure that task is executed after pause completes
    assert(executionTime >= pauseEnds, 'Queue did not pause for full time.');
  });

  it('Doesn\'t add delay after pause', async function () {
    // Create queue to test, with long delay interval
    const queue = new TaskQueue(40);
    // Pause queue for 10 milliseconds
    const start = Date.now();
    const pauseEnds = new Date(start + 10);
    queue.pauseUntil(pauseEnds);
    // Add a task that returns current time to queue
    const executionTime = await queue.add({
      task: () => { return Date.now(); },
    });
    // Ensure that task is executed after pause completes
    assert(executionTime >= pauseEnds, 'Queue did not pause for full time.');
    assert(
      executionTime < new Date(start + 15),
      'Queue adds delay after pause'
    );
  });

  it('Maintains interval when many requests are added', async function () {
    const queue = new TaskQueue(5);
    const calls = [];
    const callTimes = [];
    // Each task pushes execution time to callTimes
    for (let i = 0; i < 100; i++) {
      calls.push(queue.add({
        task: () => {
          callTimes.push(Date.now());
        },
      }));
    }
    await Promise.all(calls);
    // Provide some room for error
    for (let i = 1; i < 100; i++) {
      assert(
        callTimes[i] - callTimes[i - 1] >= 4,
        `Delay interval between calls too short: ${callTimes[i] - callTimes[i - 1]}ms`
      );
      assert(
        callTimes[i] - callTimes[i - 1] <= 10,
        `Delay interval between calls too long: ${callTimes[i] - callTimes[i - 1]}ms`
      );
    }
  });
});
