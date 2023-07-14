"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared helpers
var genVisitEndpoint_1 = __importDefault(require("./shared/helpers/genVisitEndpoint"));
// Import endpoint categories
var ECatCloudRecording_1 = __importDefault(require("./endpoints/ECatCloudRecording"));
var ECatMeeting_1 = __importDefault(require("./endpoints/ECatMeeting"));
var ECatUser_1 = __importDefault(require("./endpoints/ECatUser"));
var ECatWebinar_1 = __importDefault(require("./endpoints/ECatWebinar"));
var ZACCLError_1 = __importDefault(require("./shared/classes/ZACCLError"));
var ErrorCode_1 = __importDefault(require("./shared/types/ErrorCode"));
var ZoomAPIConfigType_1 = __importDefault(require("./types/ZoomAPIConfigType"));
// Import shared constants
var DEFAULT_ZOOM_HOSTNAME_1 = __importDefault(require("./shared/constants/DEFAULT_ZOOM_HOSTNAME"));
/**
 * Initialize Zoom api
 * @author Gabe Abrams
 * @param [config] object containing all arguments
 * @param [config.zoomHost=env.ZOOM_HOST or api.zoom.us] the hostname of Zoom or
 *   a gateway that leads to Zoom (i.e. Apigee)
 * @param [config.key=env.ZOOM_KEY] for JWT-style auth: the Zoom API key to use
 *   to generate credentials. If included, secret must also be included
 * @param [config.secret=env.ZOOM_SECRET] for JWT-style auth: the Zoom API
 *   secret to use to generate credentials. If included, key must also
 *   be included
 * @param [config.token=env.ZOOM_TOKEN] for Harvard apigee auth or manually
 *   generated token auth: the token to use
 *   for request authentication. If host points to Zoom, this token is used
 *   instead of generating a token with the key and secret. If host points to
 *   the Harvard Zoom API gateway, the token is included in the X-Api-Key
 *   header
 * @param [config.clientId=env.ZOOM_CLIENT_ID] for server-to-server
 *   oauth auth: Zoom OAuth Client ID
 * @param [config.clientSecret=env.ZOOM_CLIENT_SECRET] for server-to-server
 *   oauth auth: Zoom OAuth Client Secret
 * @param [config.accountId=env.ZOOM_ACCOUNT_ID] for server-to-server
 *   oauth auth: Zoom OAuth Account ID
 */
var initZoomAPI = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (config === void 0) { config = {}; }
    // Create a new API instance
    var api = {};
    // Determine Zoom host
    var zoomHost = ((_b = (_a = config.zoomHost) !== null && _a !== void 0 ? _a : process.env.ZOOM_HOST) !== null && _b !== void 0 ? _b : DEFAULT_ZOOM_HOSTNAME_1.default);
    // Create a fully filled-in zoomApiConfig
    var zoomAPIConfig;
    if ((config.key || process.env.ZOOM_KEY)
        && (config.secret || process.env.ZOOM_SECRET)) {
        // Key and secret provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.JWT,
            zoomHost: zoomHost,
            key: ((_c = config.key) !== null && _c !== void 0 ? _c : process.env.ZOOM_KEY),
            secret: ((_d = config.secret) !== null && _d !== void 0 ? _d : process.env.ZOOM_SECRET),
        };
    }
    else if (config.token || process.env.ZOOM_TOKEN) {
        // Token provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.Token,
            zoomHost: zoomHost,
            token: ((_e = config.token) !== null && _e !== void 0 ? _e : process.env.ZOOM_TOKEN),
        };
    }
    else if ((config.clientId || process.env.ZOOM_CLIENT_ID)
        && (config.clientSecret || process.env.ZOOM_CLIENT_SECRET)
        && (config.accountId || process.env.ZOOM_ACCOUNT_ID)) {
        // OAuth credentials provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.OAuth,
            zoomHost: zoomHost,
            clientId: ((_f = config.clientId) !== null && _f !== void 0 ? _f : process.env.ZOOM_CLIENT_ID),
            clientSecret: ((_g = config.clientSecret) !== null && _g !== void 0 ? _g : process.env.ZOOM_CLIENT_SECRET),
            accountId: ((_h = config.accountId) !== null && _h !== void 0 ? _h : process.env.ZOOM_ACCOUNT_ID),
        };
    }
    else {
        throw new ZACCLError_1.default({
            message: 'Missing Zoom credentials. Either include key+secret or include token or include clientId+clientSecret+accountId via initialization function or via environment variables. See README.',
            code: ErrorCode_1.default.CredentialsNotIncluded,
        });
    }
    // Generate a visitEndpoint function
    var visitEndpoint = (0, genVisitEndpoint_1.default)(zoomAPIConfig);
    // Create a pack of info that's used to initialize each endpoint category
    var initPack = {
        visitEndpoint: visitEndpoint,
        api: api,
    };
    // Initialize and add endpoint categories
    api.cloudRecording = new ECatCloudRecording_1.default(initPack);
    api.meeting = new ECatMeeting_1.default(initPack);
    api.user = new ECatUser_1.default(initPack);
    api.webinar = new ECatWebinar_1.default(initPack);
    // Return api instance
    return api;
};
exports.default = initZoomAPI;
//# sourceMappingURL=index.js.map