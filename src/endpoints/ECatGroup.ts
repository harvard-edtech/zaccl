/**
 * Category of endpoints for Zoom groups
 * @author Gabe Abrams
 * @namespace api.group
 */

// Import shared interfaces
import EndpointCategory from '../shared/interfaces/EndpointCategory';

// Import shared types
import ZoomGroup from '../types/ZoomGroup';
import ZoomGroupMember from '../types/ZoomGroupMember';

class ECatGroup extends EndpointCategory {
  /**
   * List groups in the account (Medium)
   * @author Gabe Abrams
   * @instance
   * @memberof api.account
   * @method listGroups
   * @param [opts] object containing all arguments
   * @param [opts.onNewPage] callback function that is called when a new page of results is received.
   * @returns the list of groups in the account
   */
  async listGroups(
    opts: {
      onNewPage?: (groups: ZoomGroup[]) => void,
    } = {},
  ): Promise<ZoomGroup[]> {
    return this.visitEndpoint({
      path: '/groups',
      action: 'list groups in the account',
      method: 'GET',
      params: {
        page_size: 10, // max allowed page size
        // TODO: change above to 300
      },
      errorMap: {
        400: 'Bad request',
        404: {
          4130: 'No groups found for this account.',
        },
      },
      itemKey: 'groups',
      onNewPage: opts.onNewPage,
    });
  }

  /**
   * List the members within a group (Medium)
   * @author Gabe Abrams
   * @instance
   * @memberof api.group
   * @method listGroupMembers
   * @param opts object containing all arguments
   * @params opts.groupId the group ID of the group of interest
   * @param [opts.onNewPage] callback function that is called when a new page of results is received.
   * @returns the list of members in the group
   */
  async listGroupMembers(
    opts: {
      groupId: string,
      onNewPage?: (groupMembers: ZoomGroupMember[]) => void,
    },): Promise<ZoomGroupMember[]> {
    return this.visitEndpoint({
      path: `/groups/${opts.groupId}/members`,
      action: 'list members in a Zoom group',
      method: 'GET',
      params: {
        page_size: 2000, // max allowed page size
      },
      itemKey: 'members',
      errorMap: {
        400: 'Bad request',
        404: {
          4130: 'No groups found for this account.',
        },
      },
      onNewPage: opts.onNewPage,
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatGroup;

