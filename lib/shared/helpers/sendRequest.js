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
 * @async
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
var sendRequest = function (opts) {
    var _a, _b, _c;
    // Set max number of retries if not defined
    var numRetries = ((_a = opts.numRetries) !== null && _a !== void 0 ? _a : 0);
    // Use default method if applicable
    var method = ((_b = opts.method) !== null && _b !== void 0 ? _b : 'GET');
    // Stringify parameters
    var stringifiedParams = qs_1.default.stringify((_c = opts.params) !== null && _c !== void 0 ? _c : {}, {
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
    });
    // Create url (include query if GET)
    var query = (method === 'GET' ? "?".concat(stringifiedParams) : '');
    var url;
    if (!opts.host) {
        // No host included at all. Just send to a path
        url = "".concat(opts.path).concat(query.length > 1 ? query : '');
    }
    else {
        url = "https://".concat(opts.host).concat(opts.path).concat(query.length > 1 ? query : '');
    }
    // Update headers
    var headers = opts.headers || {};
    if (!headers['Content-Type']) {
        // Form encoded
        headers['Content-Type'] = 'application/json';
    }
    // Send request
    return (0, axios_1.default)({
        method: method,
        url: url,
        headers: headers,
        data: opts.params,
    })
        .catch(function (err) {
        // Axios throws an error if the request status indicates an error
        // sendRequest is supposed to resolve if the request went through, whether
        // the status indicates an error or not.
        if (err.response) {
            // Resolve with response
            return Promise.resolve(err.response);
        }
        // Request failed! Check if we have more attempts
        if (numRetries > 0) {
            // Update options with one less retry
            return sendRequest(__assign(__assign({}, opts), { numRetries: numRetries - 1 }));
        }
        // No tries left
        throw new ZACCLError_1.default({
            message: 'We encountered an error when trying to send a network request. If this issue persists, contact an admin.',
            code: ErrorCode_1.default.NetworkError,
        });
    })
        .then(function (response) {
        return {
            body: response.data,
            status: response.status,
            headers: response.headers,
        };
    });
};
exports.default = sendRequest;
//# sourceMappingURL=sendRequest.js.map