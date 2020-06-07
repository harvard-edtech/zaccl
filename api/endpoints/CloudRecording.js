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
 * @method list
 * @param {object} options - object containing all arguments
 * @param {string} options.meetingId - the Zoom meeting ID or UUID
 * @return {Recording} Zoom meeting recording object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
 */
CloudRecording.list = function (options) {
  // Check if meeting ID is a valid string
  if (typeof options.meetingId !== 'string') {
    throw new ZACCLError({
      message: 'Meeting ID is not a string',
      code: ERROR_CODES.INVALID_MEETING_ID,
    });
  }

  return this.visitEndpoint({
    // Call function on meetingId to handle double encoding if necessary
    path: `/meetings/${utils.doubleEncodeIfNeeded(options.meetingId)}/recordings`,
    method: 'GET',
    errorMap: {
      400: {
        1010: 'User not found on this account',
      },
      404: {
        1001: 'User does not exist / belong to this account',
        3301: `There is no recording for the meeting ${options.meetingId}`,
      },
    },
    postProcessor: (response) => {
      // TODO: Add postprocessing operations if necessary
      return response;
    },
  });
};
CloudRecording.list.action = 'get all recordings of a meeting';
CloudRecording.list.requiredParams = ['meetingId'];
CloudRecording.list.scopes = [
  'recording:read:admin',
  'recording:read',
];

/**
 * List all cloud recordings of a user
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.cloudRecording
 * @method getList
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 * @param {number} [options.pageSize=300] - number of records
 *   returned from a single API call
 * @param {string} [options.nextPageToken=null] - token used to pageinate
 *   through large result sets
 *
 * // Note: Confusing -- look further into this
 * @param {string} [options.queryMetadata=false] -
 *
 * @param {boolean} [options.searchTrash=false] - if truthy,
 *   include recordings from trash
 * @param {string} [options.trashtype='meeting_recordings'] - Indicate type of
 *   cloud recording to retreive from the trash.
 *   Options - meeting_recordings or recording_file
 * @param {string} [options.startDate=null] - query start date in
 *   'yyyy-mm-dd' format within last 6 months
 * @param {string} [options.endDate=null] - query end date in
 *   'yyyy-mm-dd' format within last 6 months
 * @return {RecordingList} List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
 */
CloudRecording.getList = function (options) {
  // Note: the default for page_size on zoom is 30 with max of 300.

  // TODO:  Write core functions

};
CloudRecording.getList.action = 'list all cloud recordings of a user';
CloudRecording.getList.requiredParams = ['userId'];
CloudRecording.getList.scopes = [
  'recording:read:admin',
  'recording:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = CloudRecording;
