"use strict";
/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.meeting
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared interfaces
var EndpointCategory_1 = __importDefault(require("../shared/interfaces/EndpointCategory"));
// Import shared classes
var ZACCLError_1 = __importDefault(require("../shared/classes/ZACCLError"));
var ErrorCode_1 = __importDefault(require("../shared/types/ErrorCode"));
var ECatMeeting = /** @class */ (function (_super) {
    __extends(ECatMeeting, _super);
    function ECatMeeting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    ECatMeeting.prototype.get = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    show_previous_occurrences: !!opts.showAllOccurrences,
                };
                // Add optional param if exists
                if (opts.occurrenceId) {
                    params.occurrence_id = opts.occurrenceId;
                }
                // Send request
                return [2 /*return*/, this.visitEndpoint({
                        path: "/meetings/".concat(opts.meetingId),
                        action: 'get info on a meeting',
                        method: 'GET',
                        params: params,
                        errorMap: {
                            400: {
                                1010: 'The Zoom user could not be found on this account',
                                3000: 'We could not access webinar info',
                            },
                            404: {
                                1001: 'We could not find the meeting because the Zoom user does not exist',
                                3001: "Meeting ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatMeeting.prototype.create = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId, "/meetings"),
                        action: 'create a new meeting',
                        method: 'POST',
                        params: opts.meetingObj,
                        errorMap: {
                            300: "User ".concat(opts.userId, " has reached the maximum limit for creating and updating meetings"),
                            404: {
                                1001: "User ".concat(opts.userId, " either does not exist or does not belong to this account"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatMeeting.prototype.update = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: (opts.occurrenceId
                            ? "/meetings/".concat(opts.meetingId, "?occurrence_id=").concat(opts.occurrenceId)
                            : "/meetings/".concat(opts.meetingId)),
                        action: 'update the details of a meeting',
                        method: 'PATCH',
                        params: opts.meetingObj,
                        errorMap: {
                            300: 'We cannot create or update any more meetings today. Please try again tomorrow',
                            400: {
                                1010: 'We could not find the Zoom user on this account',
                                3000: 'We could not access meeting information',
                                3003: "You cannot update the meeting ".concat(opts.meetingId, " since you are not the meeting host"),
                            },
                            404: {
                                1001: 'We could not update the meeting because the user does not exist',
                                3001: "A meeting with the ID ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatMeeting.prototype.delete = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    schedule_for_reminder: !!opts.notifyHosts,
                };
                // Add optional param if exists
                if (opts.occurrenceId) {
                    params.occurrence_id = opts.occurrenceId;
                }
                // Send request
                return [2 /*return*/, this.visitEndpoint({
                        path: "/meetings/".concat(opts.meetingId),
                        action: 'delete a meeting',
                        method: 'DELETE',
                        params: params,
                        errorMap: {
                            400: {
                                1010: "We could not delete meeting ".concat(opts.meetingId, " because the user does not belong to this account"),
                                3000: "We could not access meeting information for meeting ".concat(opts.meetingId),
                                3002: "We could not delete the meeting ".concat(opts.meetingId, " since it is still in progress"),
                                3003: "You cannot delete the meeting ".concat(opts.meetingId, " since you are not the meeting host"),
                                3007: "You cannot delete the meeting ".concat(opts.meetingId, " since it has already ended"),
                                3018: 'You are not allowed to delete your Personal Meeting ID',
                                3037: 'You are not allowed to delete a Personal Meeting Conference',
                            },
                            404: {
                                1001: "We could not delete the meeting ".concat(opts.meetingId, " because the user does not exist"),
                                3001: "A meeting with the ID ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatMeeting.prototype.listPastInstances = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/past_meetings/".concat(opts.meetingId, "/instances"),
                        action: 'get the list of ended meeting instances',
                        method: 'GET',
                        errorMap: {
                            404: "We could not find a meeting with the ID ".concat(opts.meetingId),
                        },
                    })];
            });
        });
    };
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
    ECatMeeting.prototype.addAltHost = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var meetingId, altHost, meetingObj, altHosts, err_1, someUserHasBeenDeactivated, deactivatedUserIsCurrentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meetingId = opts.meetingId, altHost = opts.altHost;
                        meetingObj = opts.meetingObj;
                        if (!!meetingObj) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.meeting.get({ meetingId: meetingId })];
                    case 1:
                        meetingObj = _a.sent();
                        _a.label = 2;
                    case 2:
                        altHosts = (meetingObj.settings.alternative_hosts
                            // Split into individual hosts
                            .split(',')
                            // Remove whitespace around hosts
                            .map(function (host) {
                            return host.trim();
                        }));
                        if (!(altHosts.indexOf(altHost) < 0)) return [3 /*break*/, 8];
                        altHosts.push(altHost);
                        meetingObj.settings.alternative_hosts = altHosts.join(',');
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.api.meeting.update({ meetingId: meetingId, meetingObj: meetingObj })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        err_1 = _a.sent();
                        someUserHasBeenDeactivated = (err_1.code === 'ZOOM400-1115');
                        deactivatedUserIsCurrentUser = (err_1.message.toLowerCase().includes(altHost.toLowerCase()));
                        if (!someUserHasBeenDeactivated) return [3 /*break*/, 7];
                        if (deactivatedUserIsCurrentUser) {
                            // Cannot add as alt host because the user is deactivated
                            throw new ZACCLError_1.default({
                                message: "We could not add \"".concat(altHost, "\" to the list of alt-hosts for this meeting because that account has been deactivated."),
                                code: ErrorCode_1.default.NotAddedBecauseDeactivated,
                            });
                        }
                        // Someone else on the list has been deactivated
                        // Wipe the list and try again
                        meetingObj.settings.alternative_hosts = altHost;
                        return [4 /*yield*/, this.api.meeting.update({ meetingId: meetingId, meetingObj: meetingObj })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 8];
                    case 8: 
                    // return updated meeting object
                    return [2 /*return*/, meetingObj];
                }
            });
        });
    };
    return ECatMeeting;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatMeeting;
//# sourceMappingURL=ECatMeeting.js.map