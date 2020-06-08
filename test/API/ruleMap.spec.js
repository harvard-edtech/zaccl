const assert = require('assert');
const timekeeper = require('timekeeper');

// import helper functions
const templateToRegExp = require('../../helpers/templateToRegExp');

// import class to test
const RuleMap = require('../../helpers/ruleMap');

describe('helpers > ruleMap', function () {
  // initialize ruleMap for testing, and add initial rules
  const ruleMap = new RuleMap();
  const templates = [
    '/test/meeting/{meetingid}',
    '/test/{user}',
    '/test/call/{account}/{user}',
  ];
  const methods = ['GET', 'POST'];
  // Default values for all rules
  const defaultMaxRequestsPerDay = 30;
  const defaultMaxRequestsPerInterval = 10;

  templates.forEach((template) => {
    const regexp = templateToRegExp(template);
    methods.forEach((method) => {
      ruleMap.store({
        regexp,
        method,
        maxRequestsPerDay: defaultMaxRequestsPerDay,
        maxRequestsPerInterval: defaultMaxRequestsPerInterval,
      });
    });
  });

  it('returns a matching rule', function () {
    // lookup test endpoints
    const endpoints = [
      '/test/meeting/m1',
      '/test/u1',
      '/test/call/a1/u1',
    ];

    endpoints.forEach((endpoint) => {
      const res = ruleMap.lookup({
        method: 'GET',
        path: endpoint,
      });
      assert.equal(
        res.maxRequestsPerDay,
        defaultMaxRequestsPerDay,
        `returned rule has incorrect daily limit: ${res.regexp}`
      );
      assert.equal(
        res.dailyTokensRemaining,
        defaultMaxRequestsPerDay,
        `returned rule for ${endpoint} has incorrect daily tokens remaining on first call`
      );
    });
  });

  it('maintains the same queue for the same endpoint', function () {
    const r1 = ruleMap.lookup({
      method: 'GET',
      path: '/test/u1',
    });
    const r2 = ruleMap.lookup({
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
    const r1 = ruleMap.lookup({
      method: 'GET',
      path: '/test/u1',
    });
    const r2 = ruleMap.lookup({
      method: 'POST',
      path: '/test/u1',
    });
    const r3 = ruleMap.lookup({
      method: 'GET',
      path: '/test/call/a1/u1',
    });

    assert.notEqual(
      r1.queue,
      r2.queue,
      'map does not maintain separate queues'
    );
    assert.notEqual(
      r1.queue,
      r3.queue,
      'map does not maintain separate queues'
    );
  });

  it('does not allow duplicate rules', function () {
    try {
      ruleMap.store({
        regexp: templateToRegExp('/test/meeting/{person}'),
        method: 'GET',
        maxRequestsPerInterval: 15,
        maxRequestsPerDay: 40,
      });
      assert(false);
    } catch (err) {
      assert.equal(
        err.message,
        'A rule for this path already exists. You may not define duplicate rules.',
        'unexpected error thrown when adding duplicate rule'
      );
    }
  });
});

