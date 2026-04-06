"use strict";
/**
 * Category of endpoints for Zoom groups
 * @author Gabe Abrams
 * @namespace api.group
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared interfaces
const EndpointCategory_1 = __importDefault(require("../shared/interfaces/EndpointCategory"));
class ECatGroup extends EndpointCategory_1.default {
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
    listGroups(opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
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
                minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
            });
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
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns the list of members in the group
     */
    listGroupMembers(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
                minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
            });
        });
    }
}
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatGroup;
//# sourceMappingURL=ECatGroup.js.map