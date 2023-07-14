"use strict";
/**
 * Category of endpoints for Zoom cloud recordings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.cloudRecording
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
// Import shared helper
var utils_1 = require("../shared/helpers/utils");
var ECatCloudRecording = /** @class */ (function (_super) {
    __extends(ECatCloudRecording, _super);
    function ECatCloudRecording() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get all recordings of a meeting
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listMeetingRecordings
     * @param opts object containing all arguments
     * @param options.meetingId the Zoom meeting ID or UUID
     * @returns list of Zoom meeting recording objects {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
     */
    ECatCloudRecording.prototype.listMeetingRecordings = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Check if required param is present
                if (!opts.meetingId) {
                    throw new ZACCLError_1.default({
                        message: 'Meeting ID is a required parameter',
                        code: ErrorCode_1.default.InvalidMeetingId,
                    });
                }
                return [2 /*return*/, this.visitEndpoint({
                        // Call function on meetingId to handle double encoding if necessary
                        path: "/meetings/".concat((0, utils_1.doubleEncode)(String(opts.meetingId)), "/recordings"),
                        method: 'GET',
                        action: 'get all recordings of a meeting',
                        errorMap: {
                            400: {
                                1010: 'We could not find the user on this account',
                            },
                            404: {
                                1001: 'We could not find that user',
                                3301: "There are no recordings for the meeting ".concat(opts.meetingId),
                            },
                        },
                    })];
            });
        });
    };
    /**
     * List all cloud recordings of a user
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listUserRecordings
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param [opts.pageSize=300] number of records
     *   returned from a single API call
     * @param [opts.nextPageToken] token used to pageinate
     *   through large result sets
     * @param [opts.searchTrash=false] set to true to retrieve
     *   meeting recordings from the trash.
     * @param [opts.startDate=1 month before today]
     *   string accepted by JS Date constructor or instance of Date object.
     *   Date needs to be within past 6 months. Time data (hours and seconds)
     *   is discarded
     * @param [opts.endDate] string accepted by JS Date
     *   constructor or instance of Date object.
     *   Date needs to be within past 6 months. Time data (hours and seconds)
     *   is discarded
     * @returns List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
     */
    ECatCloudRecording.prototype.listUserRecordings = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, searchTrash, nextPageToken, startDate, endDate, pageSize, defaultDate, params;
            return __generator(this, function (_a) {
                userId = opts.userId, searchTrash = opts.searchTrash, nextPageToken = opts.nextPageToken, startDate = opts.startDate, endDate = opts.endDate, pageSize = opts.pageSize;
                defaultDate = new Date();
                defaultDate.setMonth(defaultDate.getMonth() - 1);
                params = {
                    page_size: 300,
                    trash: !!searchTrash,
                    from: (0, utils_1.formatDate)(defaultDate, 'startDate'),
                };
                if (pageSize) {
                    // Throw error if pageSize is over max val of 300
                    if (pageSize > 300) {
                        throw new ZACCLError_1.default({
                            message: "We requested ".concat(pageSize, " recordings from Zoom but it can only give us 300 at a time"),
                            code: ErrorCode_1.default.InvalidPageSize,
                        });
                    }
                    params.page_size = pageSize;
                }
                if (startDate) {
                    params.from = (0, utils_1.formatDate)(startDate, 'startDate');
                }
                if (endDate) {
                    params.to = (0, utils_1.formatDate)(endDate, 'endDate');
                }
                if (nextPageToken) {
                    params.next_page_token = nextPageToken;
                }
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(userId, "/recordings"),
                        action: 'list all cloud recordings of a user',
                        method: 'GET',
                        params: params,
                        postProcessor: function (body) {
                            // Extract the recordings from the body
                            return Array.from(body.meetings);
                        },
                        errorMap: {
                            404: {
                                1001: "We could not find the Zoom user ".concat(userId, " on this account"),
                            },
                        },
                    })];
            });
        });
    };
    ;
    return ECatCloudRecording;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatCloudRecording;
//# sourceMappingURL=ECatCloudRecording.js.map