/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
 */

// Import shared interfaces
import EndpointCategory from '../shared/interfaces/EndpointCategory';

// Import shared types
import ZoomPanelist from '../types/ZoomPanelist';
import ZoomWebinar from '../types/ZoomWebinar';

class ECatWebinar extends EndpointCategory {
  /**
   * Get info on a Webinar
   * @author Gabe Abrams
   * @instance
   * @memberof api.webinar
   * @method get
   * @param {object} opts object containing all arguments
   * @param {number} opts.webinarId the Zoom ID of the Webinar
   * @param {string} [opts.occurrenceId] ID for the Webinar occurrence
   * @param {boolean} [opts.showAllOccurrences=false] if truthy,
   *   retrieves all past occurrences
   * @returns {Webinar} Zoom Webinar object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinar}
   */
  async get(
    opts: {
      webinarId: number,
      occurrenceId?: string,
      showAllOccurrences?: boolean,
    },
  ): Promise<ZoomWebinar> {
    // Initialize params object
    const params: {
      show_previous_occurrences: boolean,
      occurrence_id?: string,
    } = {
      show_previous_occurrences: !!opts.showAllOccurrences,
    };

    // Add optional param if exists
    if (opts.occurrenceId) {
      params.occurrence_id = opts.occurrenceId;
    }

    return this.visitEndpoint({
      path: `/webinars/${opts.webinarId}`,
      action: 'get info on a webinar',
      method: 'GET',
      params,
      errorMap: {
        300: 'Invalid Webinar ID',
        400: {
          1010: 'The Zoom user could not be found on this account',
        },
        404: {
          1001: 'We could not find the webinar because the Zoom user does not exist',
          3001: `Webinar ${opts.webinarId} could not be found or has expired`,
        },
      },
    });
  }

  /**
   * Create a webinar
   * @author Gabe Abrams
   * @instance
   * @memberof api.webinar
   * @method create
   * @param opts object containing all arguments
   * @param opts.userId the user ID or email address of the user
   *   who will own the webinar
   * @param opts.webinarObj Zoom webinar object with webinar
   *   details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate#request-body}
   * @returns Zoom Webinar object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate#responses}
   */
  async create(
    opts: {
      userId: string,
      webinarObj: ZoomWebinar,
    },
  ): Promise<ZoomWebinar> {
    return this.visitEndpoint({
      path: `/users/${opts.userId}/webinars`,
      action: 'create a webinar',
      method: 'POST',
      params: opts.webinarObj,
      errorMap: {
        300: 'Invalid Webinar ID',
        400: {
          1010: 'The Zoom user could not be found on this account',
        },
        404: {
          1001: 'We could not find the webinar because the Zoom user does not exist',
          3001: 'Webinar could not be located',
        },
      },
    });
  }

  /**
   * Add one panelist if not already in the list
   * @author Gabe Abrams
   * @instance
   * @memberof api.webinar
   * @method addPanelist
   * @param opts object containing all arguments
   * @param opts.webinarId the id for the webinar to add a
   *   panelist to
   * @param opts.panelistName the name of the panelist
   * @param opts.panelistId the email or id of the panelist
   */
  async addPanelist(
    opts: {
      webinarId: number,
      panelistName: string,
      panelistId: string,
    },
  ) {
    return this.visitEndpoint({
      path: `/webinars/${opts.webinarId}/panelists`,
      action: 'add a panelist to a webinar',
      method: 'POST',
      params: {
        panelists: [
          {
            name: opts.panelistName,
            email: opts.panelistId,
          },
        ],
      },
      errorMap: {
        400: {
          1010: 'The Zoom user could not be found on this account',
        },
        404: {
          1001: 'We could not find the webinar because the Zoom user does not exist',
          3001: `Webinar ${opts.webinarId} could not be found or has expired`,
        },
      },
    });
  }

  /**
   * Get a list of panelists for a webinar
   * @author Gabe Abrams
   * @instance
   * @memberof api.webinar
   * @method listPanelists
   * @param opts object containing all arguments
   * @param opts.webinarId the id for the webinar to query
   * @returns list of participants in the form
   *   { id, name, email, join_url }
   */
  async listPanelists(
    opts: {
      webinarId: number,
    },
  ): Promise<ZoomPanelist[]> {
    const response = await this.visitEndpoint({
      path: `/webinars/${opts.webinarId}/panelists`,
      action: 'get the list of panelist for a webinar',
      method: 'GET',
      errorMap: {
        400: {
          1010: 'The Zoom user could not be found on this account',
        },
        404: {
          1001: 'We could not find the webinar because the Zoom user does not exist',
          3001: `Webinar ${opts.webinarId} could not be found or has expired`,
        },
      },
    });

    // Just keep list of panelists
    return response.panelists;
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatWebinar;
