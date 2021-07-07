/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
 */

const EndpointCategory = require('../../EndpointCategory');

class Webinar extends EndpointCategory {
  constructor(config) {
    super(config, Webinar);
  }
}

/* -------------------------- Endpoints ------------------------- */

/**
 * Get info on a Webinar
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.webinar
 * @method get
 * @param {object} options - object containing all arguments
 * @param {number} options.webinarId - the Zoom ID of the Webinar
 * @param {string} [options.occurrenceId] - ID for the Webinar occurrence
 * @param {boolean} [options.showAllOccurrences=false] - if truthy,
 *   retrieves all past occurrences
 * @return {Webinar} Zoom Webinar object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinar}
 */
Webinar.get = function (options) {
  // Initialize params object
  const params = {
    show_previous_occurrences: !!options.showAllOccurrences,
  };

  // Add optional param if exists
  if (options.occurrenceId) {
    params.occurrence_id = options.occurrenceId;
  }

  return this.visitEndpoint({
    path: `/webinars/${options.webinarId}`,
    method: 'GET',
    params,
    errorMap: {
      300: 'Invalid Webinar ID',
      400: {
        1010: 'The Zoom user could not be found on this account',
      },
      404: {
        1001: 'We could not find the webinar because the Zoom user does not exist',
        3001: `Webinar ${options.webinarId} could not be found or has expired`,
      },
    },
  });
};
Webinar.get.action = 'get info on a webinar';
Webinar.get.requiredParams = ['webinarId'];
Webinar.get.paramTypes = { occurrenceId: 'string', showAllOccurrences: 'boolean' };
Webinar.get.scopes = [
  'webinar:read:admin',
  'webinar:read',
];

/**
 * Add one panelist if not already in the list
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.webinar
 * @method addPanelist
 * @param {object} options - object containing all arguments
 * @param {number} options.webinarId - the id for the webinar to add a
 *   panelist to
 * @param {string} options.panelistName - the name of the panelist
 * @param {string} options.panelistId - the email or id of the panelist
 */
Webinar.addPanelist = function (options) {
  return this.visitEndpoint({
    path: `/webinars/${options.webinarId}/panelists`,
    method: 'POST',
    params: {
      panelists: [
        {
          name: options.panelistName,
          email: options.panelistId,
        },
      ],
    },
    errorMap: {
      400: {
        1010: 'The Zoom user could not be found on this account',
      },
      404: {
        1001: 'We could not find the webinar because the Zoom user does not exist',
        3001: `Webinar ${options.webinarId} could not be found or has expired`,
      },
    },
  });
};
Webinar.addPanelist.action = 'add a panelist to a webinar';
Webinar.addPanelist.requiredParams = ['webinarId', 'panelistId'];
Webinar.addPanelist.paramTypes = {
  webinarId: 'number',
  participantId: 'string',
};
Webinar.addPanelist.scopes = [
  'webinar:write:admin',
  'webinar:write',
];

/**
 * Get a list of panelists for a webinar
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.webinar
 * @method addPanelist
 * @param {object} options - object containing all arguments
 * @param {number} options.webinarId - the id for the webinar to query
 * @return {object[]} list of participants in the form
 *   { id, name, email, join_url }
 */
Webinar.listPanelists = function (options) {
  return this.visitEndpoint({
    path: `/webinars/${options.webinarId}/panelists`,
    method: 'GET',
    errorMap: {
      400: {
        1010: 'The Zoom user could not be found on this account',
      },
      404: {
        1001: 'We could not find the webinar because the Zoom user does not exist',
        3001: `Webinar ${options.webinarId} could not be found or has expired`,
      },
    },
  })
    .then((response) => {
      return response.panelists;
    });
};
Webinar.listPanelists.action = 'get the list of panelist for a webinar';
Webinar.listPanelists.requiredParams = ['webinarId'];
Webinar.listPanelists.paramTypes = {
  webinarId: 'number',
};
Webinar.listPanelists.scopes = [
  'webinar:read:admin',
  'webinar:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Webinar;
