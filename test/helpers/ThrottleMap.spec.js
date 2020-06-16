const assert = require('assert');

// import helper functions
const templateToRegExp = require('../../helpers/templateToRegExp');

// import class to test
const ThrottleMap = require('../../helpers/ThrottleMap');

describe('helpers > ThrottleMap', function () {
  // initialize ThrottleMap for testing, and add initial Throttles
  const throttleMap = new ThrottleMap();

  it('returns a matching throttle', async function () {
    const templates = [
      '/test/meeting/{meetingid}',
      '/test/{user}',
      '/test/call/{account}/{user}',
    ];
    const methods = ['GET', 'POST'];
    // Default values for all throttles
    const defaultMaxRequestsPerDay = 30;
    const defaultMaxRequestsPerInterval = 10;

    templates.forEach((template) => {
      const regExp = templateToRegExp(template);
      methods.forEach((method) => {
        try {
          throttleMap.addThrottle({
            regExp,
            method,
            maxRequestsPerDay: defaultMaxRequestsPerDay,
            maxRequestsPerInterval: defaultMaxRequestsPerInterval,
          });
        } catch (err) {
          throw new Error(err.message);
        }
      });
    });

    // look up test endpoints
    const endpoints = [
      '/test/meeting/m1',
      '/test/u1',
      '/test/call/a1/u1',
    ];

    endpoints.forEach((endpoint) => {
      const res = throttleMap.getThrottle({
        method: 'GET',
        path: endpoint,
      });
      assert(
        res.hasDailyLimit,
        `returned throttle for ${endpoint}  does not have a daily limit`
      );
      assert(
        res.hasRateLimit,
        `returned throttle for ${endpoint} does not have a rate limit`
      );
    });
  });

  it('returns an unlimited throttle when no rule is found', function () {
    // List of params to test, including one with a new method
    const paramList = [
      {
        method: 'DELETE',
        path: 'unthrottled',
      },
      {
        method: 'GET',
        path: 'unthrottled',
      },
    ];

    paramList.forEach((params) => {
      const throttle = throttleMap.getThrottle(params);

      // Check that a throttle is returned
      assert(throttle, 'getThrottle did not return throttle for unlimited endpoint');
      // Check that the throttle is unlimited
      assert(!throttle.hasRateLimit, 'unlimited throttle has rate limit');
      assert(!throttle.hasDailyLimit, 'unlimited throttle has daily limit');
    });
  });

  it('maintains the same queue for the same endpoint', function () {
    const r1 = throttleMap.getThrottle({
      method: 'GET',
      path: '/test/u1',
    });
    const r2 = throttleMap.getThrottle({
      method: 'GET',
      path: '/test/u2',
    });

    assert.equal(
      r1.queue,
      r2.queue,
      'map does not maintain queue per endpoint'
    );
  });

  it('maintains separate queues for separate endpoints', function () {
    const r1 = throttleMap.getThrottle({
      method: 'GET',
      path: '/test/u1',
    });
    const r2 = throttleMap.getThrottle({
      method: 'POST',
      path: '/test/u1',
    });
    const r3 = throttleMap.getThrottle({
      method: 'GET',
      path: '/test/call/a1/u1',
    });

    assert.notEqual(
      r1._queue,
      r2._queue,
      'map does not maintain separate queues'
    );
    assert.notEqual(
      r1._queue,
      r3._queue,
      'map does not maintain separate queues'
    );
  });

  it('does not allow duplicate rules', function () {
    try {
      throttleMap.addThrottle({
        regexp: templateToRegExp('/test/operation/{user}'),
        method: 'GET',
        maxRequestsPerInterval: 15,
        maxRequestsPerDay: 40,
      });
      throttleMap.addThrottle({
        regexp: templateToRegExp('/test/operation/{user}'),
        method: 'GET',
        maxRequestsPerInterval: 15,
        maxRequestsPerDay: 30,
      });
      assert(false);
    } catch (err) {
      assert.equal(
        err.message,
        'A throttle rule for this path already exists. You may not define duplicate rules.',
        'unexpected error thrown when adding duplicate throttle rule'
      );
    }
  });
});
