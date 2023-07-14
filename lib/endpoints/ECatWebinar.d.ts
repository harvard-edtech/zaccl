/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomPanelist from '../types/ZoomPanelist';
import ZoomWebinar from '../types/ZoomWebinar';
declare class ECatWebinar extends EndpointCategory {
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
    get(opts: {
        webinarId: number;
        occurrenceId?: string;
        showAllOccurrences?: boolean;
    }): Promise<ZoomWebinar>;
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
    create(opts: {
        userId: string;
        webinarObj: ZoomWebinar;
    }): Promise<ZoomWebinar>;
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
    addPanelist(opts: {
        webinarId: number;
        panelistName: string;
        panelistId: string;
    }): Promise<any>;
    /**
     * Get a list of panelists for a webinar
     * @author Gabe Abrams
     * @instance
     * @memberof api.webinar
     * @method listPanelists
     * @param opts object containing all arguments
     * @param opts.webinarId the id for the webinar to query
     * @returns list of panelists
     */
    listPanelists(opts: {
        webinarId: number;
    }): Promise<ZoomPanelist[]>;
}
export default ECatWebinar;
