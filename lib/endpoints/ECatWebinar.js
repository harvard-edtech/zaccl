"use strict";
/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
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
class ECatWebinar extends EndpointCategory_1.default {
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
    get(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize params object
            const params = {
                show_previous_occurrences: !!opts.showAllOccurrences,
            };
            // Add optional param if exists
            if (opts.occurrenceId) {
                params.occurrence_id = opts.occurrenceId;
            }
            return this.visitEndpoint({
                path: `/webinars/${opts.webinarId}`,
                action: 'get info on a webinar',
                method: 'GET',
                params,
                errorMap: {
                    300: 'Invalid Webinar ID',
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                    },
                    404: {
                        1001: 'We could not find the webinar because the Zoom user does not exist',
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
            });
        });
    }
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
    create(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/users/${opts.userId}/webinars`,
                action: 'create a webinar',
                method: 'POST',
                params: opts.webinarObj,
                errorMap: {
                    300: 'Invalid Webinar ID',
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                    },
                    404: {
                        1001: 'We could not find the webinar because the Zoom user does not exist',
                        3001: 'Webinar could not be located',
                    },
                },
            });
        });
    }
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
    addPanelist(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/webinars/${opts.webinarId}/panelists`,
                action: 'add a panelist to a webinar',
                method: 'POST',
                params: {
                    panelists: [
                        {
                            name: opts.panelistName,
                            email: opts.panelistId,
                        },
                    ],
                },
                errorMap: {
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                    },
                    404: {
                        1001: 'We could not find the webinar because the Zoom user does not exist',
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
            });
        });
    }
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
    listPanelists(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.visitEndpoint({
                path: `/webinars/${opts.webinarId}/panelists`,
                action: 'get the list of panelist for a webinar',
                method: 'GET',
                errorMap: {
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                    },
                    404: {
                        1001: 'We could not find the webinar because the Zoom user does not exist',
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
                itemKey: 'panelists',
            });
            // Just keep list of panelists
            return response.panelists;
        });
    }
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
    getParticipantReport(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/report/webinars/${opts.webinarId}/participants`,
                action: 'get participant report for a webinar',
                method: 'GET',
                params: {
                    page_size: 300, // Max page size
                },
                onNewPage: opts.onNewPage,
                minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
                errorMap: {
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                        12702: 'Cannot access a webinar from more than a year ago',
                        200: 'No permission to access this webinar',
                    },
                    404: {
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
            });
        });
    }
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
    getPollReport(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/report/webinars/${opts.webinarId}/polls`,
                action: 'get poll report for a webinar',
                method: 'GET',
                errorMap: {
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                        12702: 'Cannot access a webinar from more than a year ago',
                        200: 'No permission to access this webinar',
                    },
                    404: {
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
            });
        });
    }
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
    getQAReport(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/report/webinars/${opts.webinarId}/qa`,
                action: 'get Q&A report for a webinar',
                method: 'GET',
                errorMap: {
                    400: {
                        1010: 'The Zoom user could not be found on this account',
                        12702: 'Cannot access a webinar from more than a year ago',
                        200: 'No permission to access this webinar',
                    },
                    404: {
                        3001: `Webinar ${opts.webinarId} could not be found or has expired`,
                    },
                },
            });
        });
    }
}
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatWebinar;
//# sourceMappingURL=ECatWebinar.js.map