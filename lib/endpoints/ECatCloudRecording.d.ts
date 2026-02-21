/**
 * Category of endpoints for Zoom cloud recordings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.cloudRecording
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomMeetingRecordings from '../types/ZoomMeetingRecordings';
import ZoomRecordingInAccount from '../types/ZoomRecordingInAccount';
declare class ECatCloudRecording extends EndpointCategory {
    /**
     * List recordings in the account (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.cloudRecording
     * @method listAccountRecordings
     * @param opts object containing all arguments
     * @param opts.fromYear the start of the date range to list recordings for (e.g. 2026)
     * @param opts.fromMonth the month of the date range to list recordings for (1-12)
     * @param [opts.fromDay] the day of the month of the date range to list recordings for (1-31, defaults to 1)
     * @param [opts.accountId] the account ID of the account of interest (defaults to the account
     * associated with the current access)
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * The function is passed the new page of results as an argument.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns the list of recordings in the account
     */
    listAccountRecordings(opts: {
        fromYear: number;
        fromMonth: number;
        fromDay?: number;
        accountId?: string;
        onNewPage?: (recordings: ZoomRecordingInAccount[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomRecordingInAccount[]>;
    /**
     * Get all recordings of a meeting (Light)
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listMeetingRecordings
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom meeting ID or UUID
     * @param opts.includeDownloadAccessToken if true, the response will include a download_access_token
     *   that can be used to download the recording files
     * @returns list of Zoom meeting recording objects {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
     */
    listMeetingRecordings(opts: {
        meetingId: string | number;
        includeDownloadAccessToken?: boolean;
    }): Promise<ZoomMeetingRecordings>;
    /**
     * List all cloud recordings of a user (Medium)
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listUserRecordings
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
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
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
     */
    listUserRecordings(opts: {
        userId: string;
        searchTrash?: boolean;
        startDate?: (string | Date);
        endDate?: (string | Date);
        onNewPage?: (recordings: ZoomMeetingRecordings[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomMeetingRecordings[]>;
}
export default ECatCloudRecording;
