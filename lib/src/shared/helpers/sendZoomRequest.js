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
// Import libs
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Import shared helpers
const sendRequest_1 = __importDefault(require("./sendRequest"));
const getCurrentOAuthAccessToken_1 = __importDefault(require("./getCurrentOAuthAccessToken"));
// Import shared constants
const HARVARD_APIGEE_HOSTNAME_SUFFIX_1 = __importDefault(require("../constants/HARVARD_APIGEE_HOSTNAME_SUFFIX"));
const ZoomAPIConfigType_1 = __importDefault(require("../../types/ZoomAPIConfigType"));
const JWT_EXPIRY_SEC_1 = __importDefault(require("../constants/JWT_EXPIRY_SEC"));
/* -------------------------- Function -------------------------- */
/**
 * Send an API request to Zoom
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path Path of the endpoint
 * @param opts.method http method to use for the request
 * @param opts.action Human-readable description of the task
 * @param [opts.params] Parameters/args/body to send with request
 * @param opts.zoomAPIConfig api configuration
 */
const sendZoomRequest = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, params, zoomAPIConfig, } = opts;
    // Initialize request variables
    const headers = {};
    let fullPath;
    /*----------------------------------------*/
    /* ---------------- OAuth --------------- */
    /*----------------------------------------*/
    if (zoomAPIConfig.type === ZoomAPIConfigType_1.default.OAuth) {
        // Get the current access token
        const accessToken = yield (0, getCurrentOAuthAccessToken_1.default)(zoomAPIConfig);
        // Add token to the request
        headers.Authorization = `Bearer ${accessToken}`;
        // Determine full path
        fullPath = path_1.default.join('/v2', opts.path);
    }
    /*----------------------------------------*/
    /* ------------ JWT or Token ------------ */
    /*----------------------------------------*/
    if (zoomAPIConfig.type === ZoomAPIConfigType_1.default.JWT
        || zoomAPIConfig.type === ZoomAPIConfigType_1.default.Token) {
        // Check if our host is the Harvard HUIT Apigee system
        const usingHarvardApigee = (zoomAPIConfig.zoomHost
            && zoomAPIConfig.zoomHost.indexOf(HARVARD_APIGEE_HOSTNAME_SUFFIX_1.default) >= 0);
        // Check if we have a token
        let token;
        if (opts.zoomAPIConfig.token) {
            // Use existing token
            ({ token } = opts);
        }
        else {
            // Generate a token
            token = jsonwebtoken_1.default.sign({
                iss: opts.key,
                exp: (Date.now() + (JWT_EXPIRY_SEC_1.default * 1000)),
            }, opts.secret);
        }
        // Create headers
        if (usingHarvardApigee) {
            // Using Harvard Apigee system
            headers['X-Api-Key'] = token;
        }
        else {
            // Directly contacting Zoom
            headers.Authorization = `Bearer ${token}`;
        }
        // Find the full path
        fullPath = (usingHarvardApigee
            ? opts.path.split('?')[0]
            // ^ Apigee doesn't support versioning yet (as of 12/16/20)
            : path_1.default.join('/v2', opts.path));
    }
    /* ---------------------- Send the Request ---------------------- */
    return (0, sendRequest_1.default)({
        params,
        method,
        headers,
        path: fullPath,
        host: zoomAPIConfig.zoomHost,
    });
});
exports.default = sendZoomRequest;
//# sourceMappingURL=sendZoomRequest.js.map