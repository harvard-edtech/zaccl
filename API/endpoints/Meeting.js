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
 * @param {object} options - object containing all arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @param {string} [options.occurrenceId=null] - ID for the meeting occurrence
 * @param {boolean} [options.showAllOccurrences] - if truthy,
 * retrieves all past occurrences
 * @return {Meeting} Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting#responses}
 */
Meeting.get = function (options) {
  return this.visitEndpoint({
    path: `/meetings/${options.meetingId}`,
    method: 'GET',
    params: {
      occurrence_id: options.occurrenceId || '',
      show_previous_occurrences: !(!options.showAllOccurrences),
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
  return this.visitEndpoint({
    path: `/users/${options.userId}/meetings`,
    method: 'POST',
    params: options.meetingObj,
    errorMap: {
      300: `User ${options.userId} has reached the maximum limit for creating and updating meetings`,
      404: {
        1001: `User ${options.userId} either does not exist or does not belong to this account`,
      },
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
 * @param {object} options - object containing all arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @param {Meeting} options.meetingObj - Zoom meeting object with updated details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate#request-body}
 * @param {string} [options.occurrenceId=null] - ID for the meeting occurrence
 */
Meeting.update = function (options) {
  return this.visitEndpoint({
    path: (
      options.occurrenceId
        ? `/meetings/${options.meetingId}?occurrence_id=${options.occurrenceId}`
        : `/meetings/${options.meetingId}`
    ),
    method: 'PATCH',
    params: options.meetingObj,
    errorMap: {
      300: 'User has reached max user limit for creating/updating meetings',
      400: {
        1010: 'User not found on this account',
        3000: 'Cannot access meeting information',
        3003: 'You are not the meeting host',
      },
      404: {
        1001: 'User does not exist',
        3001: `A meeting with the ID ${options.meetingId} is not found / has expired`,
      },
    },
  });
};
Meeting.update.action = 'update the details of a meeting';
Meeting.update.requiredParams = ['meetingId', 'meetingObj'];
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
 * @param {object} options - object contining all arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @param {string} [options.occurrenceId=null] - ID for the meeting occurrence
 * @param {boolean} [options.notifyHosts=false] - if truthy,
 * sends cancellation email to hosts
 */
Meeting.delete = function (options) {
  return this.visitEndpoint({
    path: `/meetings/${options.meetingId}`,
    method: 'DELETE',
    params: {
      occurrence_id: options.occurrenceId || '',
      schedule_for_reminder: !(!options.notifyHosts),
    },
    errorMap: {
      400: {
        1010: 'User does not belong to this account',
        3000: 'Cannot access meeting information',
        3002: 'Meeting cannot be deleted since it is still in progress',
        3003: 'You are not the meeting host',
        3007: 'You cannot delete this meeting since it has ended',
        3018: 'You are not allowed to delete PMI',
        3037: 'You are not allowed to delete PAC',
      },
      404: {
        1001: 'User does not exist',
        3001: `A meeting with the ID ${options.meetingId} is not found / has expired`,
      },
    },
  });
};
Meeting.delete.action = 'delete a meeting';
Meeting.delete.requiredParams = ['meetingId'];
Meeting.delete.scopes = [
  'meeting:write:admin',
  'meeting:write',
];

/**
 * Get a list of ended meeting instances
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.meeting
 * @method listPastInstances
 * @param {object} options - object contining all arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @returns {Meeting[]} list of ended meeting instances {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetings#responses}
 */
Meeting.listPastInstances = function (options) {
  return this.visitEndpoint({
    path: `/past_meetings/${options.meetingId}/instances`,
    method: 'GET',
    errorMap: {
      404: `Meeting ${options.meetingId} not found`,
    },
  });
};
Meeting.listPastInstances.action = 'get the list of ended meeting instances';
Meeting.listPastInstances.requiredParams = ['meetingId'];
Meeting.listPastInstances.scopes = [
  'meeting:read:admin',
  'meeting:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Meeting;
