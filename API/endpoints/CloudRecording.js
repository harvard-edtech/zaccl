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
 * @return {Recording[]} list of Zoom meeting recording objects {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
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
  const meetingIdStr = String(options.meetingId);

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
 * @param {string} [options.nextPageToken] - token used to pageinate
 *   through large result sets
 * @param {boolean} [options.searchTrash=false] - if truthy,
 *   include recordings from trash
 * @param {string} [options.trashType='meeting_recordings'] - Indicate type of
 *   cloud recording to retreive from the trash.
 *   options - {'meeting_recordings', 'recording_file'}
 * @param {string|Date} [options.startDate] - query start date in
 *   'yyyy-mm-dd' format within last 6 months
 * @param {string|Date} [options.endDate] - query end date in
 *   'yyyy-mm-dd' format within last 6 months
 * @return {Recording[]} List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
 */
CloudRecording.listUserRecordings = function (options) {
  // Destructure arguments
  const {
    userId,
    searchTrash,
  } = options;

  let {
    pageSize,
    nextPageToken,
    trashType,
    startDate,
    endDate,
  } = options;

  // Declare default start Date
  const date = new Date();
  date.setMonth(date.getMonth() - 6);

  // If pageSize included, sanitize the value
  if (pageSize) {
    try {
      // sanitizeInt throws standard Error if number invalid
      pageSize = utils.sanitizeInt(pageSize);
    } catch (err) {
      // Throw specific ZACCL Error
      throw new ZACCLError({
        message: 'Page size parameter should be a valid number',
        code: ERROR_CODES.INVALID_PAGE_SIZE,
      });
    }
    // Throw error if pageSize is over max val of 300
    if (pageSize >= 300) {
      throw new ZACCLError({
        message: 'Page size cannot be higher than 300',
        code: ERROR_CODES.INVALID_PAGE_SIZE,
      });
    }
  }

  // Initialize params object with default values and only add
  // optional params if they are defined
  const params = {
    page_size: pageSize || 300,
    trash: !!searchTrash,
    from: utils.formatDate(date),
  };

  if (startDate) {
    startDate = utils.formatDate(startDate);
    params.from = startDate;
  }

  if (endDate) {
    endDate = utils.formatDate(endDate);
    params.to = endDate;
  }

  if (trashType) {
    trashType = String(trashType);
    params.trash_type = trashType;
  }

  if (nextPageToken) {
    nextPageToken = String(nextPageToken);
    params.next_page_token = nextPageToken;
  }

  return this.visitEndpoint({
    path: `/users/${userId}/recordings`,
    method: 'GET',
    params,
    postProcessor: (response) => {
      // Extract the recordings from the body
      const newResponse = response;
      newResponse.body = response.body.meetings;
      return newResponse;
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
