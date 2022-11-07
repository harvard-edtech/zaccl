"use strict";
/**
 * Category of endpoints for Zoom webinars
 * @author Gabe Abrams
 * @namespace api.webinar
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
var ECatWebinar = /** @class */ (function (_super) {
    __extends(ECatWebinar, _super);
    function ECatWebinar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    ECatWebinar.prototype.get = function (opts) {
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
                return [2 /*return*/, this.visitEndpoint({
                        path: "/webinars/".concat(opts.webinarId),
                        action: 'get info on a webinar',
                        method: 'GET',
                        params: params,
                        errorMap: {
                            300: 'Invalid Webinar ID',
                            400: {
                                1010: 'The Zoom user could not be found on this account',
                            },
                            404: {
                                1001: 'We could not find the webinar because the Zoom user does not exist',
                                3001: "Webinar ".concat(opts.webinarId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatWebinar.prototype.create = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId, "/webinars"),
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
                    })];
            });
        });
    };
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
    ECatWebinar.prototype.addPanelist = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/webinars/".concat(opts.webinarId, "/panelists"),
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
                                3001: "Webinar ".concat(opts.webinarId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
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
    ECatWebinar.prototype.listPanelists = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            path: "/webinars/".concat(opts.webinarId, "/panelists"),
                            action: 'get the list of panelist for a webinar',
                            method: 'GET',
                            errorMap: {
                                400: {
                                    1010: 'The Zoom user could not be found on this account',
                                },
                                404: {
                                    1001: 'We could not find the webinar because the Zoom user does not exist',
                                    3001: "Webinar ".concat(opts.webinarId, " could not be found or has expired"),
                                },
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        // Just keep list of panelists
                        return [2 /*return*/, response.panelists];
                }
            });
        });
    };
    return ECatWebinar;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatWebinar;
//# sourceMappingURL=ECatWebinar.js.map