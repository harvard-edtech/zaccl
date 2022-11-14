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
// Import shared helpers
var sendZoomRequest_1 = __importDefault(require("./sendZoomRequest"));
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
var ThrottleHeader_1 = __importDefault(require("../types/ThrottleHeader"));
// Import shared classes
var ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
/**
 * Generates a visit endpoint function
 * @author Gabe Abrams
 * @author Grace Whitney
 * @param zoomAPIConfig the active api configuration
 */
var genVisitEndpoint = function (zoomAPIConfig) {
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
     * @returns response body
     */
    return function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var path, params, action, errorMap, postProcessor, method, _a, status, headers, body, rateLimitTypeHeader, rateLimitType, zoomErrorMessage, errorMessage, errorCode;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    path = opts.path, params = opts.params, action = opts.action, errorMap = opts.errorMap, postProcessor = opts.postProcessor;
                    method = ((_b = opts.method) !== null && _b !== void 0 ? _b : 'GET');
                    return [4 /*yield*/, (0, sendZoomRequest_1.default)({
                            path: path,
                            method: method,
                            params: params,
                            zoomAPIConfig: zoomAPIConfig,
                        })];
                case 1:
                    _a = _c.sent(), status = _a.status, headers = _a.headers, body = _a.body;
                    /* ----------- Rate Error ----------- */
                    if (status === 429) {
                        rateLimitTypeHeader = Object.keys(headers).filter(function (header) {
                            return (header.toLowerCase() === 'x-ratelimit-type');
                        })[0];
                        rateLimitType = (headers[rateLimitTypeHeader]
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
                        zoomErrorMessage = 'An unknown Zoom error occurred.';
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
                        errorMessage = "We couldn't ".concat(action, " because an error occurred: ").concat(zoomErrorMessage);
                        errorCode = "ZOOM".concat(status).concat(body.code ? "-".concat(body.code) : '');
                        throw new ZACCLError_1.default({
                            message: errorMessage,
                            code: errorCode,
                        });
                    }
                    /* ----- Post-process and Return ---- */
                    if (postProcessor) {
                        return [2 /*return*/, postProcessor(body)];
                    }
                    return [2 /*return*/, body];
            }
        });
    }); };
};
exports.default = genVisitEndpoint;
//# sourceMappingURL=genVisitEndpoint.js.map