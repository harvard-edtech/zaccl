/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.meeting
 */

// Import shared interfaces
import EndpointCategory from '../shared/interfaces/EndpointCategory';

// Import shared classes
import ZACCLError from '../shared/classes/ZACCLError';
import ErrorCode from '../shared/types/ErrorCode';

// Import shared types
import ZoomMeeting from '../types/ZoomMeeting';

class ECatMeeting extends EndpointCategory {
  /**
   * Get info on a meeting
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method get
   * @param opts object containing all arguments
   * @param opts.meetingId the Zoom ID of the meeting
   * @param [opts.occurrenceId] ID for the meeting occurrence
   * @param [opts.showAllOccurrences=false] if truthy,
   *   retrieves all past occurrences
   * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting#responses}
   */
  async get(
    opts: {
      meetingId: number,
      occurrenceId?: string,
      showAllOccurrences?: boolean,
    },
  ): Promise<ZoomMeeting> {
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

    // Send request
    return this.visitEndpoint({
      path: `/meetings/${opts.meetingId}`,
      action: 'get info on a meeting',
      method: 'GET',
      params,
      errorMap: {
        400: {
          1010: 'The Zoom user could not be found on this account',
          3000: 'We could not access webinar info',
        },
        404: {
          1001: 'We could not find the meeting because the Zoom user does not exist',
          3001: `Meeting ${opts.meetingId} could not be found or has expired`,
        },
      },
    });
  }

  /**
   * Create a new meeting
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method create
   * @param opts object containing all arguments
   * @param opts.userId the user ID or email address of the user
   * @param opts.meetingObj Zoom meeting object with meeting details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
   * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
   */
  async create(
    opts: {
      userId: string,
      meetingObj: ZoomMeeting,
    },
  ): Promise<ZoomMeeting> {
    return this.visitEndpoint({
      path: `/users/${opts.userId}/meetings`,
      action: 'create a new meeting',
      method: 'POST',
      params: opts.meetingObj,
      errorMap: {
        300: `User ${opts.userId} has reached the maximum limit for creating and updating meetings`,
        404: {
          1001: `User ${opts.userId} either does not exist or does not belong to this account`,
        },
      },
    });
  }

  /**
   * Update a meeting
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method update
   * @param opts object containing all arguments
   * @param opts.meetingId the Zoom ID of the meeting
   * @param opts.meetingObj Zoom meeting object with updated details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate#request-body}
   * @param [opts.occurrenceId] ID for the meeting occurrence
   * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
   */
  async update(
    opts: {
      meetingId: number,
      meetingObj: ZoomMeeting,
      occurrenceId?: string,
    },
  ): Promise<ZoomMeeting> {
    return this.visitEndpoint({
      path: (
        opts.occurrenceId
          ? `/meetings/${opts.meetingId}?occurrence_id=${opts.occurrenceId}`
          : `/meetings/${opts.meetingId}`
      ),
      action: 'update the details of a meeting',
      method: 'PATCH',
      params: opts.meetingObj,
      errorMap: {
        300: 'We cannot create or update any more meetings today. Please try again tomorrow',
        400: {
          1010: 'We could not find the Zoom user on this account',
          3000: 'We could not access meeting information',
          3003: `You cannot update the meeting ${opts.meetingId} since you are not the meeting host`,
        },
        404: {
          1001: 'We could not update the meeting because the user does not exist',
          3001: `A meeting with the ID ${opts.meetingId} could not be found or has expired`,
        },
      },
    });
  }

  /**
   * Delete a meeting
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method delete
   * @param opts object containing all arguments
   * @param opts.meetingId the Zoom ID of the meeting
   * @param [opts.occurrenceId] ID for the meeting occurrence
   * @param [opts.notifyHosts=false] if truthy,
   *   sends cancellation email to hosts
   * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
   */
  async delete(
    opts: {
      meetingId: number,
      occurrenceId?: string,
      notifyHosts?: boolean,
    },
  ): Promise<ZoomMeeting> {
    // Initialize params object
    const params: {
      schedule_for_reminder: boolean,
      occurrence_id?: string,
    } = {
      schedule_for_reminder: !!opts.notifyHosts,
    };

    // Add optional param if exists
    if (opts.occurrenceId) {
      params.occurrence_id = opts.occurrenceId;
    }

    // Send request
    return this.visitEndpoint({
      path: `/meetings/${opts.meetingId}`,
      action: 'delete a meeting',
      method: 'DELETE',
      params,
      errorMap: {
        400: {
          1010: `We could not delete meeting ${opts.meetingId} because the user does not belong to this account`,
          3000: `We could not access meeting information for meeting ${opts.meetingId}`,
          3002: `We could not delete the meeting ${opts.meetingId} since it is still in progress`,
          3003: `You cannot delete the meeting ${opts.meetingId} since you are not the meeting host`,
          3007: `You cannot delete the meeting ${opts.meetingId} since it has already ended`,
          3018: 'You are not allowed to delete your Personal Meeting ID',
          3037: 'You are not allowed to delete a Personal Meeting Conference',
        },
        404: {
          1001: `We could not delete the meeting ${opts.meetingId} because the user does not exist`,
          3001: `A meeting with the ID ${opts.meetingId} could not be found or has expired`,
        },
      },
    });
  }

  /**
   * Get a list of ended meeting instances
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method listPastInstances
   * @param opts object containing all arguments
   * @param opts.meetingId the Zoom ID of the meeting
   * @returns list of ended meeting instances {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetings#responses}
   */
  async listPastInstances(
    opts: {
      meetingId: number,
    },
  ): Promise<ZoomMeeting[]> {
    return this.visitEndpoint({
      path: `/past_meetings/${opts.meetingId}/instances`,
      action: 'get the list of ended meeting instances',
      method: 'GET',
      errorMap: {
        404: `We could not find a meeting with the ID ${opts.meetingId}`,
      },
    });
  }

  /**
   * List past poll occurrences
   * @author Yuen Ler Chow
   * @instance
   * @memberof api.meeting
   * @method listPastPolls
   * @param opts object containing all arguments
   * @param opts.meetingId the Zoom ID of the meeting
   * @returns list of past poll occurrences {@link https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/listPastMeetingPolls}
   */
  async listPastPolls(
    opts: {
      meetingId: number,
    },
  ): Promise<???[]> {
    // TODO: implement
    // TODO: create a type for the return type (add type to /src/types)
  }

  /**
   * Add one alt-host if not already in the list. If another user in the alt-host
   *   list has been deactivated, all alt-hosts are removed and the requested
   *   user is added as the only alt-host. This is because Zoom doesn't give us
   *   enough information to determine which user is deactivated, and thus,
   *   the only way to resolve the issue is to remove all previously existing
   *   alt-hosts.
   * @author Gabe Abrams
   * @author Aryan Pandey
   * @instance
   * @memberof api.meeting
   * @method addAltHost
   * @param opts object containing all arguments
   * @param opts.meetingId the id for the meeting to add hosts to
   * @param opts.altHost the email or id of the alt host to
   *   be added
   * @param [opts.meetingObj] Zoom meeting object that needs to be
   *   updated. Meeting ID is not used to fetch meeting if this object is passed
   * @returns updated meeting object after adding alternative host
   */
  async addAltHost(
    opts: {
      meetingId: number,
      altHost: string,
      meetingObj?: ZoomMeeting,
    },
  ): Promise<ZoomMeeting> {
    // Destructure arguments
    const {
      meetingId,
      altHost,
    } = opts;
    let { meetingObj } = opts;

    // Only call get if no meetingObj passed
    if (!meetingObj) {
      meetingObj = await this.api.meeting.get({ meetingId });
    }

    // extract altHosts into an array
    const altHosts = (
      meetingObj.settings.alternative_hosts
        // Split into individual hosts
        .split(',')
        // Remove whitespace around hosts
        .map((host) => {
          return host.trim();
        })
    );

    // add as altHost only if not already present
    if (altHosts.indexOf(altHost) < 0) {
      altHosts.push(altHost);
      meetingObj.settings.alternative_hosts = altHosts.join(',');

      try {
        await this.api.meeting.update({ meetingId, meetingObj });
      } catch (err) {
        // Handle deactivated user case
        const someUserHasBeenDeactivated = (err.code === 'ZOOM400-1115');
        const deactivatedUserIsCurrentUser = (
          err.message.toLowerCase().includes(altHost.toLowerCase())
        );
        if (someUserHasBeenDeactivated) {
          if (deactivatedUserIsCurrentUser) {
            // Cannot add as alt host because the user is deactivated
            throw new ZACCLError({
              message: `We could not add "${altHost}" to the list of alt-hosts for this meeting because that account has been deactivated.`,
              code: ErrorCode.NotAddedBecauseDeactivated,
            });
          }

          // Someone else on the list has been deactivated
          // Wipe the list and try again
          meetingObj.settings.alternative_hosts = altHost;
          await this.api.meeting.update({ meetingId, meetingObj });
        }
      }
    }

    // return updated meeting object
    return meetingObj;
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatMeeting;
