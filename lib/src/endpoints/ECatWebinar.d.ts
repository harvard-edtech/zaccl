/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomPanelist from '../types/ZoomPanelist';
import ZoomParticipantInReport from '../types/ZoomParticipantInReport';
import ZoomWebinar from '../types/ZoomWebinar';
import ZoomWebinarPollReport from '../types/ZoomWebinarPollReport';
import ZoomWebinarQAReport from '../types/ZoomWebinarQAReport';
declare class ECatWebinar extends EndpointCategory {
    /**
     * Get info on a Webinar (Light)
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
    get(opts: {
        webinarId: number | string;
        occurrenceId?: string;
        showAllOccurrences?: boolean;
    }): Promise<ZoomWebinar>;
    /**
     * Create a webinar (Light)
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
    create(opts: {
        userId: string;
        webinarObj: ZoomWebinar;
    }): Promise<ZoomWebinar>;
    /**
     * Add one panelist if not already in the list (Medium)
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
    addPanelist(opts: {
        webinarId: number | string;
        panelistName: string;
        panelistId: string;
    }): Promise<any>;
    /**
     * Get a list of panelists for a webinar (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.webinar
     * @method listPanelists
     * @param opts object containing all arguments
     * @param opts.webinarId the id for the webinar to query
     * @returns list of panelists
     */
    listPanelists(opts: {
        webinarId: string | number;
    }): Promise<ZoomPanelist[]>;
    /**
     * Get a list of participants for a webinar (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.webinar
     * @method getParticipantReport
     * @param opts object containing all arguments
     * @param opts.webinarId the id for the webinar to query
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of participants
     */
    getParticipantReport(opts: {
        webinarId: number | string;
        onNewPage?: (participants: ZoomParticipantInReport[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomParticipantInReport[]>;
    /**
     * Get a poll report for a webinar (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.webinar
     * @method getPollReport
     * @param opts object containing all arguments
     * @param opts.webinarId the id for the webinar to query
     * @returns list of polls
     */
    getPollReport(opts: {
        webinarId: number | string;
    }): Promise<ZoomWebinarPollReport>;
    /**
     * Get a Q&A report for a webinar (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.webinar
     * @method getQAReport
     * @param opts object containing all arguments
     * @param opts.webinarId the id for the webinar to query
     * @returns Q&A report for the webinar
     */
    getQAReport(opts: {
        webinarId: number | string;
    }): Promise<ZoomWebinarQAReport>;
}
export default ECatWebinar;
