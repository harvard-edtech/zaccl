/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.cloudRecording
 */

const EndpointCategory = require('../../EndpointCategory');
const ZACCLError = require('../../ZACCLError');
const ERROR_CODES = require('../../ERROR_CODES');
const utils = require('../../EndpointCategory/helpers/utils');

class CloudRecording extends EndpointCategory {
  constructor(config) {
    super(config, CloudRecording);
  }
}

/* -------------------------- Endpoints ------------------------- */

/**
 * Get all recordings of a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.cloudRecording
 * @method listMeetingRecordings
 * @param {object} options - object containing all arguments
 * @param {string|number} options.meetingId - the Zoom meeting ID or UUID
 * @return {Recording} Zoom meeting recording object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
 */
CloudRecording.listMeetingRecordings = function (options) {
  // Check if required param is present
  if (!options.meetingId) {
    throw new ZACCLError({
      message: 'Meeting ID is a required parameter',
      code: ERROR_CODES.INVALID_MEETING_ID,
    });
  }

  // Cast meeting ID to a string so we can run string operations
  const meetingIdStr = options.meetingId.toString();

  return this.visitEndpoint({
    // Call function on meetingId to handle double encoding if necessary
    path: `/meetings/${utils.doubleEncodeIfNeeded(meetingIdStr)}/recordings`,
    method: 'GET',
    errorMap: {
      400: {
        1010: 'We could not find the user on this account',
      },
      404: {
        1001: 'We could not find that user',
        3301: `There are no recordings for the meeting ${options.meetingId}`,
      },
    },
  });
};
CloudRecording.listMeetingRecordings.action = 'get all recordings of a meeting';
CloudRecording.listMeetingRecordings.requiredParams = ['meetingId'];
CloudRecording.listMeetingRecordings.scopes = [
  'recording:read:admin',
  'recording:read',
];

/**
 * List all cloud recordings of a user
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.cloudRecording
 * @method listUserRecordings
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 * @param {number} [options.pageSize=300] - number of records
 *   returned from a single API call
 * @param {string} [options.nextPageToken=null] - token used to pageinate
 *   through large result sets
 * @param {boolean} [options.searchTrash=false] - if truthy,
 *   include recordings from trash
 * @param {string} [options.trashtype='meeting_recordings'] - Indicate type of
 *   cloud recording to retreive from the trash.
 *   options - {'meeting_recordings', 'recording_file'}
 * @param {string} [options.startDate=null] - query start date in
 *   'yyyy-mm-dd' format within last 6 months
 * @param {string} [options.endDate=null] - query end date in
 *   'yyyy-mm-dd' format within last 6 months
 * @return {RecordingList} List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
 */
CloudRecording.listUserRecordings = function (options) {
  // Validate date strings if passed in
  if (options.startDate && !utils.validateDate(options.startDate)) {
    throw new ZACCLError({
      message: 'Date needs to be in the format yyyy-mm-dd',
      code: ERROR_CODES.INVALID_DATE_FORMAT,
    });
  }

  if (options.endDate && !utils.validateDate(options.endDate)) {
    throw new ZACCLError({
      message: 'Date needs to be in the format yyyy-mm-dd',
      code: ERROR_CODES.INVALID_DATE_FORMAT,
    });
  }

  return this.visitEndpoint({
    path: `/users/${options.userId}/recordings`,
    method: 'GET',
    params: {
      // Note: The max page size allowed by zoom is 300
      page_size: options.pageSize || 300,
      next_page_token: options.nextPageToken || '',
      trash: !!options.searchTrash,
      trash_type: options.trashtype || 'meeting_recordings',
      from: options.startDate || '',
      to: options.endDate || '',
    },
    errorMap: {
      404: {
        1001: 'We could not find that user on this account',
      },
    },
  });
};
CloudRecording.listUserRecordings.action = 'list all cloud recordings of a user';
CloudRecording.listUserRecordings.requiredParams = ['userId'];
CloudRecording.listUserRecordings.scopes = [
  'recording:read:admin',
  'recording:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = CloudRecording;
