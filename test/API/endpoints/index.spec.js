const assert = require('assert');

// import classes to test
const API = require('../../../API');
const genStubAPIRequest = require('../helpers/stubAPIRequest');

const testAPI = new API({
  key: 'fakeKey',
  secret: 'fakeSecret',
  sendZoomRequest: genStubAPIRequest(),
});

describe('Meeting Endpoints', async function () {
  it('gets Meeting with only required params', async function () {
    const ret = await testAPI.meeting.get({ meetingId: 12345 });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: false });
  });

  it('gets Meeting with only showAllOccurrences', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', showAllOccurrences: 'true' });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: true });
  });

  it('gets Meeting with only occurrenceId', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', occurrenceId: 5555 });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: false, occurrence_id: '5555' });
  });

  it('updates Meeting', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: { stubParam: '1' } });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'PATCH');
    assert.deepEqual(ret.params, { stubParam: '1' });
  });

  it('updates Meeting with occurrenceId present', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: {}, occurrenceId: 'present' });
    assert.equal(ret.path, '/meetings/12345?occurrence_id=present');
    assert.equal(ret.method, 'PATCH');
    assert.deepEqual(ret.params, {});
  });

  it('deletes Meeting', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345 });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'DELETE');
    assert.deepEqual(ret.params, { schedule_for_reminder: false });
  });

  it('deletes Meeting with optional params', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345, notifyHosts: 'yes', occurrenceId: 55 });
    assert.equal(ret.path, '/meetings/12345');
    assert.equal(ret.method, 'DELETE');
    assert.deepEqual(ret.params, { schedule_for_reminder: true, occurrence_id: '55' });
  });

  it('lists Past Meeting Instances', async function () {
    const ret = await testAPI.meeting.listPastInstances({ meetingId: 12345 });
    assert.equal(ret.path, '/past_meetings/12345/instances');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });
});

// TODO: Test without post-processor altering response object
describe('User Endpoints', async function () {
  it('gets ZAKToken', async function () {
    const ret = await testAPI.user.getZAKToken({ userId: 12345 });
    // Post processor makes response object just the token which would
    // be undefined for the fake user
    assert.strictEqual(ret, undefined);
  });
});

describe('Cloud Recording Endpoints', async function () {
  it('lists Meeting Recordings', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: 12345 });
    assert.equal(ret.path, '/meetings/12345/recordings');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  it('lists Meeting Recordings with double encoding needed (Test 1)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: '/12345' });
    assert.equal(ret.path, '/meetings/%252F12345/recordings');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  it('lists Meeting Recordings with double encoding needed (Test 2)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: '123//45' });
    assert.equal(ret.path, '/meetings/123%252F%252F45/recordings');
    assert.equal(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  // TODO : Test without post processor altering response object
  it('lists User Recordings', async function () {
    const ret = await testAPI.cloudRecording.listUserRecordings({ userId: '12345' });
  });
});
