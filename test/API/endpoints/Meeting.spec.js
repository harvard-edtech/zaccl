const assert = require('assert');

// import classes to test
const API = require('../../../API');

// import stub API
const genStubAPIRequest = require('../helpers/stubAPIRequest');

describe('Meeting Endpoints', async function () {
  let testAPI;
  beforeEach(() => {
    // Create API instance before every test
    testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubAPIRequest(),
    });
  });

  it('gets Meeting with only required params', async function () {
    const ret = await testAPI.meeting.get({ meetingId: 12345 });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      { show_previous_occurrences: false },
      'Actual request sent does not match expected request'
    );
  });

  it('gets Meeting with showAllOccurrences as string', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', showAllOccurrences: 'true' });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    // Check if string converted to boolean
    assert.deepEqual(
      ret.params,
      { show_previous_occurrences: true },
      'Actual request sent does not match expected request'
    );
  });

  it('gets Meeting with only occurrenceId as string', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', occurrenceId: '5555' });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      { show_previous_occurrences: false, occurrence_id: '5555' },
      'Actual request sent does not match expected request'
    );
  });

  it('gets Meeting with only occurrenceId as number', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', occurrenceId: 9841 });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    // Check if number got converted to string
    assert.deepEqual(
      ret.params,
      { show_previous_occurrences: false, occurrence_id: '9841' },
      'Actual request sent does not match expected request'
    );
  });

  it('updates Meeting', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: { stubParam: '1' } });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'PATCH',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      { stubParam: '1' },
      'Actual request sent does not match expected request'
    );
  });

  it('updates Meeting with occurrenceId present', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: {}, occurrenceId: 'present' });
    assert.equal(
      ret.path,
      '/meetings/12345?occurrence_id=present',
      'path does not match'
    );
    assert.deepEqual(
      ret.params,
      {},
      'params should be empty'
    );
  });

  it('deletes Meeting', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345 });
    assert.equal(
      ret.path,
      '/meetings/12345',
      'Path does not match'
    );
    assert.equal(
      ret.method,
      'DELETE',
      'Method does not match'
    );
    assert.deepEqual(
      ret.params,
      { schedule_for_reminder: false },
      'Params object is different from expected'
    );
  });

  it('deletes Meeting with optional params', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345, notifyHosts: 'yes', occurrenceId: 55 });
    assert.deepEqual(
      ret.params,
      { schedule_for_reminder: true, occurrence_id: '55' },
      'Params object is different from expected'
    );
  });

  it('lists Past Meeting Instances', async function () {
    const ret = await testAPI.meeting.listPastInstances({ meetingId: 12345 });
    assert.equal(
      ret.path,
      '/past_meetings/12345/instances',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      undefined,
      'params should be empty'
    );
  });

  it('gets Meeting without required params', async function () {
    try {
      await testAPI.meeting.get({ occurrenceId: 'test' });
    } catch (err) {
      assert.equal(
        err.message,
        'We could not get info on a meeting because the meetingId parameter is required but was excluded.',
        'Invalid error thrown'
      );
    }
  });
});
