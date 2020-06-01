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
 * @param {number} meetingId - the Zoom id of the meeting (int64 format)
 * @param {string} [occurrenceId] - the id for the meeting occurrence
 * @param {boolean} [showAllOccurrences] - if truthy, retreives all past occurences
 * @return {Meeting} Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting#responses}
 */
Meeting.get = function (options) {
  // TODO: write core function
  // return this.visitEndpoint({
  //   path: `/meetings/${options.meetingId}`,
  //   method: 'GET',
  //   params: {},
  //   errorMap: {
  //     ......
  //   },
  //   postProcessor: (response) => {
  //     // some operations
  //     return newResponse;
  //   },
  // })
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
 * @param {string} userId - the user id or email address of the user
 * @param {Meeting} meetingObj - Zoom meeting object with meeting details
 * @return {Meeting} Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
 */
Meeting.create = function (options) {

  // TODO: write core function

};
Meeting.create.action = 'create a new meeting';
Meeting.create.requiredParams = ['userId, meetingObj'];
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
 * @param {number} meetingId - The meeting id (int64 format)
 * @param {Meeting} meetingObj - Zoom meeting object with updated details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate#request-body}
 * @param {string} [occurrenceId] - the id for the meeting occurrence
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
 * @param {number} meetingId - The meeting id (int64 format)
 * @param {string} [occurrenceId] - the id for the meeting occurrence
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
