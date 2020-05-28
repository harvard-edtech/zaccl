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
 * @param {number} meetingId - the Zoom id of the meeting
 * @param {string} occurrenceId - the id for the meeting occurrence
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
