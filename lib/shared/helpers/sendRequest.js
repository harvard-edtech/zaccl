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
// Import qs
const qs_1 = __importDefault(require("qs"));
// Import ZACCLError
const ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
// Import shared types
const ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
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
const sendRequest = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Set max number of retries if not defined
    const numRetries = ((_a = opts.numRetries) !== null && _a !== void 0 ? _a : 0);
    // Use default method if applicable
    const method = ((_b = opts.method) !== null && _b !== void 0 ? _b : 'GET');
    // Stringify parameters
    const stringifiedParams = qs_1.default.stringify((_c = opts.params) !== null && _c !== void 0 ? _c : {}, {
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
    });
    // Create url (include query if GET)
    const query = (method === 'GET' ? `?${stringifiedParams}` : '');
    let url;
    if (!opts.host) {
        // No host included at all. Just send to a path
        url = `${opts.path}${query.length > 1 ? query : ''}`;
    }
    else {
        url = `https://${opts.host}${opts.path}${query.length > 1 ? query : ''}`;
    }
    // Update headers
    const headers = opts.headers || {};
    if (!headers['Content-Type']) {
        // Form encoded
        headers['Content-Type'] = 'application/json';
    }
    // Send request
    try {
        const response = yield fetch(url, {
            method,
            headers,
            body: method !== 'GET' ? JSON.stringify(opts.params) : undefined,
        });
        // Parse response body (try JSON first, fall back to text)
        let body;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            body = yield response.json();
        }
        else {
            body = yield response.text();
        }
        // Convert Headers to a plain object
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });
        // Return response (fetch does not throw on non-2xx statuses, so all
        // HTTP responses resolve here, matching the original behavior where
        // both success and error-with-response resolved)
        return {
            body,
            status: response.status,
            headers: responseHeaders,
        };
    }
    catch (err) {
        // Fetch only throws on network failures (not HTTP error statuses)
        // Request failed! Check if we have more attempts
        if (numRetries > 0) {
            // Update options with one less retry
            return sendRequest(Object.assign(Object.assign({}, opts), { numRetries: numRetries - 1 }));
        }
        // No tries left
        throw new ZACCLError_1.default({
            message: 'We encountered an error when trying to send a network request. If this issue persists, contact an admin.',
            code: ErrorCode_1.default.NetworkError,
        });
    }
});
exports.default = sendRequest;
//# sourceMappingURL=sendRequest.js.map