"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// Import libs
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
// Import ZACCLError
var ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
// Import shared types
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
/**
 * Sends and retries an http request
 * @author Gabe Abrams
 * @param {string} host host to send request to
 * @param {string} path path to send request to
 * @param {string} [method=GET] http method to use
 * @param {object} [params] body/data to include in the request
 * @param {object} [headers] headers to include in the request
 * @param {number} [numRetries=0] number of times to retry the request if it
 *   fails
 * @returns { body, status, headers } on
 *   success
 */
var sendRequest = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var numRetries, method, stringifiedParams, query, url, headers, response, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                numRetries = ((_a = opts.numRetries) !== null && _a !== void 0 ? _a : 0);
                method = ((_b = opts.method) !== null && _b !== void 0 ? _b : 'GET');
                stringifiedParams = qs_1.default.stringify((_c = opts.params) !== null && _c !== void 0 ? _c : {}, {
                    encodeValuesOnly: true,
                    arrayFormat: 'brackets',
                });
                query = (method === 'GET' ? "?".concat(stringifiedParams) : '');
                if (!opts.host) {
                    // No host included at all. Just send to a path
                    url = "".concat(opts.path).concat(query.length > 1 ? query : '');
                }
                else {
                    url = "https://".concat(opts.host).concat(opts.path).concat(query.length > 1 ? query : '');
                }
                headers = opts.headers || {};
                if (!headers['Content-Type']) {
                    // Form encoded
                    headers['Content-Type'] = 'application/json';
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: method,
                        url: url,
                        headers: headers,
                        data: opts.params,
                    })];
            case 2:
                response = _d.sent();
                // Only return part of the axios response
                return [2 /*return*/, {
                        body: response.data,
                        status: response.status,
                        headers: response.headers,
                    }];
            case 3:
                err_1 = _d.sent();
                // Axios throws an error if the request status indicates an error
                // sendRequest is supposed to resolve if the request went through, whether
                // the status indicates an error or not.
                if (err_1.response) {
                    // Resolve with response
                    return [2 /*return*/, Promise.resolve({
                            body: err_1.response.data,
                            status: err_1.response.status,
                            headers: err_1.response.headers,
                        })];
                }
                // Request failed! Check if we have more attempts
                if (numRetries > 0) {
                    // Update options with one less retry
                    return [2 /*return*/, sendRequest(__assign(__assign({}, opts), { numRetries: numRetries - 1 }))];
                }
                // No tries left
                throw new ZACCLError_1.default({
                    message: 'We encountered an error when trying to send a network request. If this issue persists, contact an admin.',
                    code: ErrorCode_1.default.NetworkError,
                });
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = sendRequest;
//# sourceMappingURL=sendRequest.js.map