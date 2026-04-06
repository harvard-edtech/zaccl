"use strict";
/**
 * Category of endpoints for Zoom cloud recordings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.cloudRecording
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
// Import shared classes
const ZACCLError_1 = __importDefault(require("../shared/classes/ZACCLError"));
const ErrorCode_1 = __importDefault(require("../shared/types/ErrorCode"));
// Import shared helper
const utils_1 = require("../shared/helpers/utils");
class ECatCloudRecording extends EndpointCategory_1.default {
    /**
     * List recordings in the account (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.cloudRecording
     * @method listAccountRecordings
     * @param opts object containing all arguments
     * @param opts.fromYear the start of the date range to list recordings for (e.g. 2026)
     * @param opts.fromMonth the month of the date range to list recordings for (1-12)
     * @param [opts.fromDay] the day of the month of the date range to list recordings for (1-31, defaults to 1)
     * @param [opts.accountId] the account ID of the account of interest (defaults to the account
     * associated with the current access)
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * The function is passed the new page of results as an argument.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns the list of recordings in the account
     */
    listAccountRecordings(opts) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Generate from date
            const { fromYear, fromMonth, minMsBetweenPageRequests, } = opts;
            const fromMonthPadded = fromMonth < 10 ? `0${fromMonth}` : fromMonth;
            const fromDay = (_a = opts.fromDay) !== null && _a !== void 0 ? _a : 1;
            const fromDayPadded = fromDay < 10 ? `0${fromDay}` : fromDay;
            const fromDateString = `${fromYear}-${fromMonthPadded}-${fromDayPadded}`;
            // Generate to date
            let toYear = fromYear;
            let toMonth = opts.fromMonth + 1;
            if (toMonth > 12) {
                toMonth = 1;
                toYear += 1;
            }
            let toMonthPadded = toMonth < 10 ? `0${toMonth}` : toMonth;
            let toDay = fromDay;
            let toDayPadded = toDay < 10 ? `0${toDay}` : toDay;
            const toDateString = `${toYear}-${toMonthPadded}-${toDayPadded}`;
            return this.visitEndpoint({
                path: `/accounts/${(_b = opts.accountId) !== null && _b !== void 0 ? _b : 'me'}/recordings`,
                action: 'list recordings in the account',
                method: 'GET',
                params: {
                    page_size: 300,
                    from: fromDateString,
                    to: toDateString,
                },
                onNewPage: opts.onNewPage,
                minMsBetweenPageRequests,
                itemKey: 'meetings',
                errorMap: {
                    400: 'Bad request',
                    404: 'No recordings found',
                },
            });
        });
    }
    /**
     * Get all recordings of a meeting (Light)
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listMeetingRecordings
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom meeting ID or UUID
     * @param opts.includeDownloadAccessToken if true, the response will include a download_access_token
     *   that can be used to download the recording files
     * @returns list of Zoom meeting recording objects {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
     */
    listMeetingRecordings(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if required param is present
            if (!opts.meetingId) {
                throw new ZACCLError_1.default({
                    message: 'Meeting ID is a required parameter',
                    code: ErrorCode_1.default.InvalidMeetingId,
                });
            }
            // Create params
            const params = {};
            if (opts.includeDownloadAccessToken) {
                params.include_fields = 'download_access_token';
                params.ttl = 604800; // Max TTL
            }
            return this.visitEndpoint({
                // Call function on meetingId to handle double encoding if necessary
                path: `/meetings/${(0, utils_1.doubleEncode)(String(opts.meetingId))}/recordings`,
                method: 'GET',
                action: 'get all recordings of a meeting',
                params,
                errorMap: {
                    400: {
                        1010: 'We could not find the user on this account',
                    },
                    404: {
                        1001: 'We could not find that user',
                        3301: `There are no recordings for the meeting ${opts.meetingId}`,
                    },
                },
            });
        });
    }
    /**
     * List all cloud recordings of a user (Medium)
     * @author Aryan Pandey
     * @instance
     * @memberof api.cloudRecording
     * @method listUserRecordings
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
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
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns List of Zoom Recordings {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist#responses}
     */
    listUserRecordings(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructure arguments
            const { userId, searchTrash, startDate, endDate, onNewPage, minMsBetweenPageRequests, } = opts;
            // Declare default start Date to 1 month before
            const defaultDate = new Date();
            defaultDate.setMonth(defaultDate.getMonth() - 1);
            // Initialize params object with default values and only add
            // optional params if they are defined
            const params = {
                page_size: 300,
                trash: !!searchTrash,
                from: (0, utils_1.formatDate)(defaultDate, 'startDate'),
            };
            if (startDate) {
                params.from = (0, utils_1.formatDate)(startDate, 'startDate');
            }
            if (endDate) {
                params.to = (0, utils_1.formatDate)(endDate, 'endDate');
            }
            return this.visitEndpoint({
                path: `/users/${userId}/recordings`,
                action: 'list all cloud recordings of a user',
                method: 'GET',
                params,
                onNewPage: opts.onNewPage,
                minMsBetweenPageRequests,
                itemKey: 'meetings',
                errorMap: {
                    404: {
                        1001: `We could not find the Zoom user ${userId} on this account`,
                    },
                },
            });
        });
    }
    ;
}
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatCloudRecording;
//# sourceMappingURL=ECatCloudRecording.js.map