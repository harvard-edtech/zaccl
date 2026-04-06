"use strict";
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
// Import shared helpers
const sendZoomRequest_1 = __importDefault(require("./sendZoomRequest"));
const ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
const ThrottleHeader_1 = __importDefault(require("../types/ThrottleHeader"));
// Import shared classes
const ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
/**
 * Generates a visit endpoint function
 * @author Gabe Abrams
 * @author Grace Whitney
 * @param zoomAPIConfig the active api configuration
 */
const genVisitEndpoint = (zoomAPIConfig) => {
    /**
     * Visit a Zoom endpoint
     * @author Gabe Abrams
     * @param opts object containing all arguments
     * @param opts.path Path of the endpoint
     * @param opts.method http method to use for the request
     * @param opts.action Human-readable description of the task
     * @param opts.errorMap map of Zoom errors taken from the API docs
     * @param [opts.postProcessor] function that processes the response before
     *   returning
     * @param [opts.params] Parameters/args/body to send with request
     * @param [opts.onNewPage] callback function that is called when a
     * new page of results is received
     * @param [opts.itemKey] the key in the response body where the list of items can be found
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between
     * paginated requests, for custom throttle control
     * @returns response body
     */
    return (opts) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { path, params, action, errorMap, itemKey, onNewPage, minMsBetweenPageRequests } = opts;
        const method = ((_a = opts.method) !== null && _a !== void 0 ? _a : 'GET');
        // Paging state
        let nextPageToken = undefined;
        let isFirstPage = true;
        let isPaginated = false; // Inferred by responses, always starts false
        const allItems = [];
        let lastPageRequestTimestamp = 0;
        // Fetch page by page
        while (nextPageToken || isFirstPage) {
            // Don't fetch another page unless we get a token
            isFirstPage = false;
            /* ---------- Send Request ---------- */
            // If minMsBetweenPageRequests is set, ensure we wait at least that long between requests
            if (minMsBetweenPageRequests) {
                // Check how long since the last request
                const now = Date.now();
                const timeSinceLastRequest = now - lastPageRequestTimestamp;
                // Wait extra time if we haven't waited long enough yet
                if (timeSinceLastRequest < minMsBetweenPageRequests) {
                    yield new Promise((resolve) => {
                        setTimeout(resolve, minMsBetweenPageRequests - timeSinceLastRequest);
                    });
                }
                // Update timestamp of last page request
                lastPageRequestTimestamp = Date.now();
            }
            // Send the request
            const { status, headers, body } = yield (0, sendZoomRequest_1.default)({
                path,
                method,
                params: Object.assign(Object.assign({}, params), { next_page_token: nextPageToken }),
                zoomAPIConfig,
            });
            /* ----------- Rate Error ----------- */
            if (status === 429) {
                // Case-insensitive header lookup
                const [rateLimitTypeHeader] = Object.keys(headers).filter((header) => {
                    return (header.toLowerCase() === 'x-ratelimit-type');
                });
                // Case-insensitive limit type lookup
                const rateLimitType = (headers[rateLimitTypeHeader]
                    && headers[rateLimitTypeHeader].toLowerCase());
                if (rateLimitType === ThrottleHeader_1.default.DailyLimitHeader) {
                    // Daily limit
                    throw new ZACCLError_1.default({
                        message: 'Zoom is very busy today. Please try this operation again tomorrow.',
                        code: ErrorCode_1.default.DailyLimitError,
                    });
                }
                else if (rateLimitType === ThrottleHeader_1.default.RateLimitHeader) {
                    // Rate limit
                    throw new ZACCLError_1.default({
                        message: 'Zoom is very busy right now. Please try this operation again later.',
                        code: ErrorCode_1.default.RateLimitError,
                    });
                }
                else {
                    // Unknown rate limit
                    throw new ZACCLError_1.default({
                        message: 'Zoom is very busy right now. Please try this operation again.',
                        code: ErrorCode_1.default.UnknownLimitError,
                    });
                }
            }
            /* -------- Custom Error Code ------- */
            if (status < 200 || status >= 300) {
                // A Zoom error occurred
                // Check status to see if its in the error map
                let zoomErrorMessage = 'An unknown Zoom error occurred.';
                if (errorMap[status]) {
                    if (typeof errorMap[status] === 'string') {
                        // Found the error message
                        zoomErrorMessage = errorMap[status];
                    }
                    else if (body.code) {
                        // Check for nested error message
                        if (typeof errorMap[status][body.code] === 'string') {
                            // Found nested error message
                            zoomErrorMessage = errorMap[status][body.code];
                        }
                        else if (body.message) {
                            // errorMap[status][code] did not return err message
                            // so we check body
                            if (typeof body.message === 'string') {
                                zoomErrorMessage = body.message;
                            }
                        }
                    }
                }
                else if (body.message) {
                    // Error message not in the error map so check body
                    if (typeof body.message === 'string') {
                        zoomErrorMessage = body.message;
                    }
                }
                const errorMessage = `We couldn't ${action} because an error occurred: ${zoomErrorMessage}`;
                const errorCode = `ZOOM${status}${body.code ? `-${body.code}` : ''}`;
                throw new ZACCLError_1.default({
                    message: errorMessage,
                    code: errorCode,
                });
            }
            /* ----------- Postprocess ---------- */
            // Extract results
            let results = itemKey ? body[itemKey] : body;
            // Update next page token
            nextPageToken = body.next_page_token;
            if (nextPageToken) {
                isPaginated = true;
            }
            // End if not paginated
            if (!isPaginated) {
                return results;
            }
            /* --------- Paging Handling -------- */
            // Add items to allItems if paginated
            if (Array.isArray(results)) {
                allItems.push(...results);
            }
            // Call onNewPage callback if it exists
            if (onNewPage) {
                onNewPage(results);
            }
        }
        ;
        // Return all items (if we got here, response is paginated)
        return allItems;
    });
};
exports.default = genVisitEndpoint;
//# sourceMappingURL=genVisitEndpoint.js.map