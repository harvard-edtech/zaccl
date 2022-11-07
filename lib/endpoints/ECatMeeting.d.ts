/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.meeting
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomMeeting from '../types/ZoomMeeting';
declare class ECatMeeting extends EndpointCategory {
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
    get(opts: {
        meetingId: number;
        occurrenceId?: string;
        showAllOccurrences?: boolean;
    }): Promise<ZoomMeeting>;
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
    create(opts: {
        userId: string;
        meetingObj: ZoomMeeting;
    }): Promise<ZoomMeeting>;
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
    update(opts: {
        meetingId: number;
        meetingObj: ZoomMeeting;
        occurrenceId?: string;
    }): Promise<ZoomMeeting>;
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
    delete(opts: {
        meetingId: number;
        occurrenceId?: string;
        notifyHosts?: boolean;
    }): Promise<ZoomMeeting>;
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
    listPastInstances(opts: {
        meetingId: number;
    }): Promise<ZoomMeeting[]>;
    /**
     * Add one alt-host if not already in the list. If another user in the alt-host
     *   list has been deactivated, all alt-hosts are removed and the requested
     *   user is added as the only alt-host
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
}
export default ECatMeeting;
