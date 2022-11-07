/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.cloudRecording
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomMeetingRecordings from '../types/ZoomMeetingRecordings';
import ZoomUserRecordings from '../types/ZoomUserRecording';
declare class ECatCloudRecording extends EndpointCategory {
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
    listMeetingRecordings(opts: {
        meetingId: string | number;
    }): Promise<ZoomMeetingRecordings>;
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
    listUserRecordings(opts: {
        userId: string;
        pageSize?: number;
        nextPageToken?: string;
        searchTrash?: boolean;
        startDate?: (string | Date);
        endDate?: (string | Date);
    }): Promise<ZoomUserRecordings>;
}
export default ECatCloudRecording;
