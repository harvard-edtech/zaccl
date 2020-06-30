const assert = require('assert');

// import classes to test
const API = require('../../../API');
const genStubAPIRequest = require('../helpers/stubAPIRequest');

// import helper classes
const utils = require('../../../EndpointCategory/helpers/utils');

// Create API instance
const testAPI = new API({
  key: 'fakeKey',
  secret: 'fakeSecret',
  sendZoomRequest: genStubAPIRequest(),
});

describe('Meeting Endpoints', async function () {
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
});

// TODO: Test without post-processor altering response object
// describe('User Endpoints', async function () {
//   it('gets ZAKToken', async function () {
//     const ret = await testAPI.user.getZAKToken({ userId: 12345 });
//     assert.equal(
//       ret.path,
//       '/users/12345/token',
//       'path does not match'
//     );
//     assert.equal(
//       ret.method,
//       'GET',
//       'method does not match'
//     );
//     assert.deepEqual(
//       ret.params,
//       { type: 'zak' },
//       'params object does not match'
//     );
//   });
// });

describe('Cloud Recording Endpoints', async function () {
  // Set up the default date value to use for comparision later
  let defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() - 6);
  defaultDate = utils.formatDate(defaultDate);

  it('lists Meeting Recordings', async function () {
    const ret = await testAPI.cloudRecording
      .listMeetingRecordings({ meetingId: 12345 });
    assert.equal(
      ret.path,
      '/meetings/12345/recordings',
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

  it('lists Meeting Recordings with double encoding needed (Test 1)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: '/xUPpM3lTxqFSV4bVBrzDQ==' });
    assert.equal(
      ret.path,
      '/meetings/%252FxUPpM3lTxqFSV4bVBrzDQ%253D%253D/recordings',
      'double encoding failed'
    );
  });

  it('lists Meeting Recordings with double encoding needed (Test 2)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: 'XA+DOiHeR8+Cs/5vf2eJGQ==' });
    assert.equal(
      ret.path,
      '/meetings/XA%252BDOiHeR8%252BCs%252F5vf2eJGQ%253D%253D/recordings',
      'double encoding failed'
    );
  });

  // TODO : Test without post processor altering response object
  // it('lists User Recordings with only required params', async function () {
  //   const ret = await testAPI.cloudRecording
  //     .listUserRecordings({ userId: '12345' });
  //   assert.equal(
  //     ret.path,
  //     '/users/12345/recordings',
  //     'path does not match'
  //   );
  //   assert.equal(
  //     ret.method,
  //     'GET',
  //     'method does not match'
  //   );
  //   assert.deepEqual(
  //     ret.params,
  //     { page_size: 300, trash: false, from: defaultDate },
  //     'params object does not match'
  //   );
  // });

  // it('lists User Recordings with pagesize', async function () {
  //   const ret = await testAPI.cloudRecording
  //     .listUserRecordings({ userId: '12345', pageSize: '39' });
  //   assert.deepEqual(
  //     ret.params,
  //     { page_size: 39, trash: false, from: defaultDate },
  //     'params object does not match'
  //   );
  // });


  // it('lists User Recordings with start and end dates', async function () {
  //   const ret = await testAPI.cloudRecording.listUserRecordings({ userId: '12345', startDate: '2020/08/20', endDate: '2020-10/5' });
  //   assert.deepEqual(
  //     ret.params,
  //     {
  //       page_size: 300,
  //       trash: false,
  //       from: '2020-08-20',
  //       to: '2020-10-05',
  //     },
  //     'params object does not match'
  //   );
  // });

  // it('lists User Recordings with invalid date', async function () {
  //   try {
  //     await testAPI.cloudRecording.listUserRecordings({ userId: '12345', startDate: 'invalid' });
  //   } catch (err) {
  //     assert.equal(
  //       err.message,
  //       'startDate needs to be a JS Date instance or a string accepted by the Date constructor',
  //       'Wrong error message thrown'
  //     );
  //   }
  // });

  // it('lists User Recordings with invalid pageSize', async function () {
  //   try {
  //     await testAPI.cloudRecording.listUserRecordings({ userId: '12345', pageSize: 'invalid' });
  //   } catch (err) {
  //     assert.equal(
  //       err.message,
  //       'A request to Zoom wasn\'t formatted properly: pageSize should be a number.',
  //       'Wrong error message thrown'
  //     );
  //   }
  // });

  // it('lists User Recordings with nextPageToken', async function () {
  //   const ret = await testAPI.cloudRecording.listUserRecordings({ userId: '12345', nextPageToken: 565 });
  //   assert.deepEqual(
  //     ret.params,
  //     {
  //       page_size: 300,
  //       trash: false,
  //       from: defaultDate,
  //       next_page_token: '565',
  //     },
  //     'params object does not match'
  //   );
  // });
});
