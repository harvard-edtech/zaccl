/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.meeting
 */

const EndpointCategory = require('../../EndpointCategory');
const utils = require('../../EndpointCategory/helpers/utils');

class Meeting extends EndpointCategory {
  constructor(config) {
    super(config, Meeting);
  }
}

/* -------------------------- Endpoints ------------------------- */

/**
 * Get info on a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.meeting
 * @method get
 * @param {object} options - object containing ll arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @param {string} [options.occurrenceId=null] - ID for the meeting occurrence
 * @param {boolean} [options.showAllOccurrences=false] - if truthy,
 * retrieves all past occurences
 * @return {Meeting} Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting#responses}
 */
Meeting.get = function (options) {
  return this.visitEndpoint({
    path: `/meetings/${options.meetingId}`,
    method: 'GET',
    params: {
      occurerenceId: options.occurrenceId || '',
      showAllOccurrences: !(!options.showAllOccurrences),
    },
    errorMap: {
      400: {
        1010: 'User not found on this account',
        3000: 'Cannot access webinar info',
      },
      404: {
        1001: 'Meeting not found because user does not exist',
        3001: `Meeting ${options.meetingId} is not found or has expired`,
      },
    },
    postProcessor: (response) => {
      // TODO: Add postprocessing operations if necessary
      return response;
    },
  });
};
Meeting.get.action = 'get info on a meeting';
Meeting.get.requiredParams = ['meetingId'];
Meeting.get.scopes = [
  'meeting:read:admin',
  'meeting:read',
];

/**
 * Create a new meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.meeting
 * @method create
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 * @param {Meeting} options.meetingObj - Zoom meeting object with meeting details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
 * @return {Meeting} Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
 */
Meeting.create = function (options) {
  // TODO?: Add preprocessing checks for the fields in options.meetingObj

  return this.visitEndpoint({
    path: `/users/${options.userId}/meetings`,
    method: 'POST',
    params: options.meetingObj,
    errorMap: {
      300: `User ${options.userId} has reached max user limit for creating/updating meetings`,
      404: {
        1001: `User ${options.userId} does not exist / belong to this account`,
      },
    },
    postProcessor: (response) => {
      // TODO: Add postprocessing operations if necessary
      return response;
    },
  });
};
Meeting.create.action = 'create a new meeting';
Meeting.create.requiredParams = ['userId', 'meetingObj'];
Meeting.create.scopes = [
  'meeting:write:admin',
  'meeting:write',
];

/**
 * Update a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.meeting
 * @method update
 * @param {number} meetingId - the Zoom ID of the meeting
 * @param {Meeting} meetingObj - Zoom meeting object with updated details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate#request-body}
 * @param {string} [occurrenceId] - the ID for the meeting occurrence
 */
Meeting.update = function (options) {

  // TODO: write core function

};
Meeting.update.action = 'update the details of a meeting';
Meeting.update.requiredParams = ['meetingId, meetingObj'];
Meeting.update.scopes = [
  'meeting:write:admin',
  'meeting:write',
];

/**
 * Delete a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.meeting
 * @method delete
 * @param {number} meetingId - the Zoom ID of the meeting
 * @param {string} [occurrenceId] - the ID for the meeting occurrence
 * @param {boolean} [notifyHosts] - if truthy, sends cancellation email to hosts
 */
Meeting.delete = function (options) {

  // TODO: write core function

};
Meeting.delete.action = 'delete a meeting';
Meeting.delete.requiredParams = ['meetingId'];
Meeting.delete.scopes = [
  'meeting:write:admin',
  'meeting:write',
];
