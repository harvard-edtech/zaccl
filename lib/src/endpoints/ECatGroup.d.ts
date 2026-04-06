/**
 * Category of endpoints for Zoom groups
 * @author Gabe Abrams
 * @namespace api.group
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomGroup from '../types/ZoomGroup';
import ZoomGroupMember from '../types/ZoomGroupMember';
declare class ECatGroup extends EndpointCategory {
    /**
     * List groups in the account (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.account
     * @method listGroups
     * @param [opts] object containing all arguments
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns the list of groups in the account
     */
    listGroups(opts?: {
        onNewPage?: (groups: ZoomGroup[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomGroup[]>;
    /**
     * List the members within a group (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.group
     * @method listGroupMembers
     * @param opts object containing all arguments
     * @params opts.groupId the group ID of the group of interest
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns the list of members in the group
     */
    listGroupMembers(opts: {
        groupId: string;
        onNewPage?: (groupMembers: ZoomGroupMember[]) => void;
        minMsBetweenPageRequests?: number;
    }): Promise<ZoomGroupMember[]>;
}
export default ECatGroup;
