/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.meeting
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomMeeting from '../types/ZoomMeeting';
import PollOccurrence from '../types/ZoomPollOccurrence';
import PollInfo from '../types/ZoomPollInfo';
import ZoomMeetingDetails from '../types/ZoomMeetingDetails';
import ZoomMeetingIdAndStartTime from '../types/ZoomMeetingIdAndStartTime';
import ZoomMeetingTranscript from '../types/ZoomMeetingTranscript';
import ZoomPastMeetingParticipant from '../types/ZoomPastMeetingParticipant';
import ZoomMeetingActivitiesReportItem from '../types/ZoomMeetingActivitiesReportItem';
import ZoomParticipantInReport from '../types/ZoomParticipantInReport';
import ZoomMeetingQAReportItem from '../types/ZoomMeetingQAReportItem';
declare class ECatMeeting extends EndpointCategory {
    /**
     * Get info on a meeting (Light)
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
     * @returns Zoom meeting object
     */
    get(opts: {
        meetingId: number;
        occurrenceId?: string;
        showAllOccurrences?: boolean;
    }): Promise<ZoomMeeting>;
    /**
     * Create a new meeting (Light)
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
    create(opts: {
        userId: string;
        meetingObj: ZoomMeeting;
    }): Promise<ZoomMeeting>;
    /**
     * Update a meeting (Light)
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
    update(opts: {
        meetingId: number;
        meetingObj: ZoomMeeting;
        occurrenceId?: string;
    }): Promise<ZoomMeeting>;
    /**
     * Delete a meeting (Light)
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
    delete(opts: {
        meetingId: number;
        occurrenceId?: string;
        notifyHosts?: boolean;
    }): Promise<ZoomMeeting>;
    /**
     * Get a list of ended meeting instances (Medium)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method listPastInstances
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @returns list of ended meeting instances {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetings#responses}
     */
    listPastInstances(opts: {
        meetingId: number;
    }): Promise<ZoomMeetingIdAndStartTime[]>;
    /**
     * Get details of a past meeting instance (Light)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method getPastMeetingDetails
     * @param uuid the Zoom UUID of the meeting
     * @returns details of a past meeting instance
     */
    getPastMeetingDetails(opts: {
        uuid: string;
    }): Promise<ZoomMeetingDetails>;
    /**
     * List past poll occurrences (Medium)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method listPastPollOccurrences
     * @param opts.uuid the Zoom UUID of the meeting
     * @returns list of past poll occurrences
     */
    listPastPollOccurrences(opts: {
        uuid: string;
    }): Promise<PollOccurrence[]>;
    /**
     * Get poll info (Light)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method getPollInfo
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @param opts.pollId the id of the poll
     * @returns object with all info about the poll
     */
    getPollInfo(opts: {
        meetingId: number;
        pollId: string;
    }): Promise<PollInfo>;
    /**
     * Add one alt-host if not already in the list. If another user in the alt-host
     *   list has been deactivated, all alt-hosts are removed and the requested
     *   user is added as the only alt-host. This is because Zoom doesn't give us
     *   enough information to determine which user is deactivated, and thus,
     *   the only way to resolve the issue is to remove all previously existing
     *   alt-hosts. (Light)
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
    addAltHost(opts: {
        meetingId: number;
        altHost: string;
        meetingObj?: ZoomMeeting;
    }): Promise<ZoomMeeting>;
    /**
     * Get meeting transcript (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getTranscript
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting (or UUID of a past meeting instance)
     * @returns meeting transcript
     */
    getTranscript(opts: {
        meetingId: number;
    }): Promise<ZoomMeetingTranscript>;
    /**
     * Get list of participants in a past meeting (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method listPastMeetingParticipants
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the past meeting instance
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of past meeting participants
     */
    listPastMeetingParticipants(opts: {
        meetingId: string;
        onNewPage?: (participants: ZoomPastMeetingParticipant[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomPastMeetingParticipant[]>;
    /**
     * Get a meeting activities report (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getActivitiesReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @param opts.startTimestamp the start of the time range to get activities for, in ms since epoch
     * @param [opts.endTimestamp] the end of the time range to get activities for, in ms since epoch.
     * If not provided, defaults to startTimestamp + 24 hours
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of past meeting participants
     */
    getActivitiesReport(opts: {
        meetingId: string;
        startTimestamp: number;
        endTimestamp?: number;
        onNewPage?: (activityItems: ZoomMeetingActivitiesReportItem[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomMeetingActivitiesReportItem[]>;
    /**
     * Get a participant report for a meeting (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getParticipantReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of meeting participants with report details
     */
    getParticipantReport(opts: {
        meetingId: string;
        onNewPage?: (participants: ZoomParticipantInReport[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomParticipantInReport[]>;
    /**
     * Get a question and answer report for a meeting (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getMeetingQAReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @returns list of questions and answers from the meeting
     */
    getMeetingQAReport(opts: {
        meetingId: string;
    }): Promise<ZoomMeetingQAReportItem[]>;
}
export default ECatMeeting;
