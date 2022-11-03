/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.cloudRecording
 */

// Import shared interfaces
import EndpointCategory from '../shared/interfaces/EndpointCategory';

// Import shared classes
import ZACCLError from '../shared/classes/ZACCLError';
import ErrorCode from '../shared/types/ErrorCode';

// Import shared types
import ZoomMeetingRecordings from '../types/ZoomMeetingRecordings';
import ZoomUserRecordings from '../types/ZoomUserRecording';

// Import shared helper
import {
  doubleEncode,
  formatDate,
} from '../shared/helpers/utils';

class ECatCloudRecording extends EndpointCategory {
  /**
   * Get all recordings of a meeting
   * @author Aryan Pandey
   * @instance
   * @memberof api.cloudRecording
   * @method listMeetingRecordings
   * @param opts object containing all arguments
   * @param options.meetingId the Zoom meeting ID or UUID
   * @returns list of Zoom meeting recording objects {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
   */
  async listMeetingRecordings(
    opts: {
      meetingId: string | number,
    },
  ): Promise<ZoomMeetingRecordings> {
    // Check if required param is present
    if (!opts.meetingId) {
      throw new ZACCLError({
        message: 'Meeting ID is a required parameter',
        code: ErrorCode.InvalidMeetingId,
      });
    }

    return this.visitEndpoint({
      // Call function on meetingId to handle double encoding if necessary
      path: `/meetings/${doubleEncode(String(opts.meetingId))}/recordings`,
      method: 'GET',
      action: 'get all recordings of a meeting',
      errorMap: {
        400: {
          1010: 'We could not find the user on this account',
        },
        404: {
          1001: 'We could not find that user',
          3301: `There are no recordings for the meeting ${opts.meetingId}`,
        },
      },
    });
  }

  /**
   * List all cloud recordings of a user
   * @author Aryan Pandey
   * @instance
   * @memberof api.cloudRecording
   * @method listUserRecordings
   * @param opts object containing all arguments
   * @param opts.userId the user ID or email address of the user
   * @param [opts.pageSize=300] number of records
   *   returned from a single API call
   * @param [opts.nextPageToken] token used to pageinate
   *   through large result sets
   * @param [opts.searchTrash=false] set to true to retrieve
   *   meeting recordings from the trash.
   * @param [opts.startDate=1 month before today]
   *   string accepted by JS Date constructor or instance of Date object.
   *   Date needs to be within past 6 months. Time data (hours and seconds)
   *   is discarded
   * @param [opts.endDate] string accepted by JS Date
   *   constructor or instance of Date object.
   *   Date needs to be within past 6 months. Time data (hours and seconds)
   *   is discarded
   * @returns List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
   */
  async listUserRecordings(
    opts: {
      userId: string,
      pageSize?: number,
      nextPageToken?: string,
      searchTrash?: boolean,
      startDate?: (string | Date),
      endDate?: (string | Date),
    },
  ): Promise<ZoomUserRecordings> {
    // Destructure arguments
    const {
      userId,
      searchTrash,
      nextPageToken,
      startDate,
      endDate,
      pageSize,
    } = opts;

    // Declare default start Date to 1 month before
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() - 1);

    // Initialize params object with default values and only add
    // optional params if they are defined
    const params: {
      page_size: number,
      trash: boolean,
      from: string,
      to?: string,
      next_page_token?: string,
    } = {
      page_size: 300,
      trash: !!searchTrash,
      from: formatDate(defaultDate, 'startDate'),
    };

    if (pageSize) {
      // Throw error if pageSize is over max val of 300
      if (pageSize > 300) {
        throw new ZACCLError({
          message: `We requested ${pageSize} recordings from Zoom but it can only give us 300 at a time`,
          code: ErrorCode.InvalidPageSize,
        });
      }
      params.page_size = pageSize;
    }

    if (startDate) {
      params.from = formatDate(startDate, 'startDate');
    }

    if (endDate) {
      params.to = formatDate(endDate, 'endDate');
    }

    if (nextPageToken) {
      params.next_page_token = nextPageToken;
    }

    return this.visitEndpoint({
      path: `/users/${userId}/recordings`,
      action: 'list all cloud recordings of a user',
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
          1001: `We could not find the Zoom user ${userId} on this account`,
        },
      },
    });
  };
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatCloudRecording;
