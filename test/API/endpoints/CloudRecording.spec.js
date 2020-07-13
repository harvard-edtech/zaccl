const assert = require('assert');

// import classes to test
const API = require('../../../API');

// import stub API
const genStubAPIRequest = require('../helpers/stubAPIRequest');

// import helper classes
const utils = require('../../../EndpointCategory/helpers/utils');

describe('Cloud Recording Endpoints', async function () {
  let testAPI;
  let defaultDate;
  beforeEach(() => {
    // Create API instance before every test
    testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      sendZoomRequest: genStubAPIRequest(),
    });

    // Set up the default date value to use for comparision later
    defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() - 6);
    defaultDate = utils.formatDate(defaultDate);
  });

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

  it('lists Meeting Recordings with double encoding needed (Test 3)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: 'XZuBo//2QQKmm/v2+Cxwvw==' });
    assert.equal(
      ret.path,
      '/meetings/XZuBo%252F%252F2QQKmm%252Fv2%252BCxwvw%253D%253D/recordings',
      'double encoding failed'
    );
  });

  it('lists User Recordings with only required params', async function () {
    const ret = await testAPI.cloudRecording
      .listUserRecordings({ userId: '12345' });
    assert.equal(
      ret.path,
      '/users/12345/recordings',
      'path does not match'
    );
    assert.equal(
      ret.method,
      'GET',
      'method does not match'
    );
    assert.deepEqual(
      ret.params,
      { page_size: 300, trash: false, from: defaultDate },
      'params object does not match'
    );
  });

  it('lists User Recordings with pagesize', async function () {
    const ret = await testAPI.cloudRecording
      .listUserRecordings({ userId: '12345', pageSize: '39' });
    assert.deepEqual(
      ret.params,
      { page_size: 39, trash: false, from: defaultDate },
      'params object does not match'
    );
  });


  it('lists User Recordings with start and end dates', async function () {
    const ret = await testAPI.cloudRecording.listUserRecordings(
      {
        userId: '12345',
        startDate: '2020/08/20',
        endDate: '2020-10/5',
      }
    );
    assert.deepEqual(
      ret.params,
      {
        page_size: 300,
        trash: false,
        from: '2020-08-20',
        to: '2020-10-05',
      },
      'params object does not match'
    );
  });

  it('lists User Recordings with invalid date', async function () {
    try {
      await testAPI.cloudRecording.listUserRecordings({ userId: '12345', startDate: 'invalid' });
    } catch (err) {
      assert.equal(
        err.message,
        'startDate needs to be a JS Date instance or a string accepted by the Date constructor',
        'Wrong error message thrown'
      );
    }
  });

  it('lists User Recordings with invalid pageSize', async function () {
    try {
      await testAPI.cloudRecording.listUserRecordings({ userId: '12345', pageSize: 'invalid' });
    } catch (err) {
      assert.equal(
        err.message,
        'A request to Zoom wasn\'t formatted properly: pageSize should be a number.',
        'Wrong error message thrown'
      );
    }
  });

  it('lists User Recordings with paging functionality', async function () {
    testAPI = new API({
      key: 'fakeKey',
      secret: 'fakeSecret',
      // Ask for 5 paged responses
      sendZoomRequest: genStubAPIRequest(5),
    });
    const ret = await testAPI.cloudRecording.listUserRecordings({ userId: '12345', nextPageToken: 1 });
    assert.deepEqual(
      ret,
      [{
        path: '/users/12345/recordings',
        method: 'GET',
        params:
        {
          page_size: 300,
          trash: false,
          from: '2020-01-13',
          next_page_token: 1,
        },
      },
      {
        path: '/users/12345/recordings',
        method: 'GET',
        params:
        {
          page_size: 300,
          trash: false,
          from: '2020-01-13',
          next_page_token: 2,
        },
      },
      {
        path: '/users/12345/recordings',
        method: 'GET',
        params:
        {
          page_size: 300,
          trash: false,
          from: '2020-01-13',
          next_page_token: 3,
        },
      },
      {
        path: '/users/12345/recordings',
        method: 'GET',
        params:
        {
          page_size: 300,
          trash: false,
          from: '2020-01-13',
          next_page_token: 4,
        },
      },
      {
        path: '/users/12345/recordings',
        method: 'GET',
        params:
        {
          page_size: 300,
          trash: false,
          from: '2020-01-13',
          next_page_token: 5,
        },
      }],
      'Return object does not match'
    );
  });
});
