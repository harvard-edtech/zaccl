"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomMeetingType = exports.ZoomMeetingOrWebinarType = exports.ZoomRecordingType = exports.ZoomPollType = exports.ZoomLoginMethod = exports.ZoomPollStatus = exports.ZoomPollQuestionAndAnswerType = exports.ZoomFileType = void 0;
// Import shared helpers
const genVisitEndpoint_1 = __importDefault(require("./shared/helpers/genVisitEndpoint"));
// Import endpoint categories
const ECatCloudRecording_1 = __importDefault(require("./endpoints/ECatCloudRecording"));
const ECatMeeting_1 = __importDefault(require("./endpoints/ECatMeeting"));
const ECatUser_1 = __importDefault(require("./endpoints/ECatUser"));
const ECatWebinar_1 = __importDefault(require("./endpoints/ECatWebinar"));
const ECatGroup_1 = __importDefault(require("./endpoints/ECatGroup"));
const ZACCLError_1 = __importDefault(require("./shared/classes/ZACCLError"));
const ErrorCode_1 = __importDefault(require("./shared/types/ErrorCode"));
const ZoomAPIConfigType_1 = __importDefault(require("./types/ZoomAPIConfigType"));
const ZoomFileType_1 = __importDefault(require("./types/ZoomFileType"));
exports.ZoomFileType = ZoomFileType_1.default;
const ZoomPollQuestionAndAnswerType_1 = __importDefault(require("./types/ZoomPollQuestionAndAnswerType"));
exports.ZoomPollQuestionAndAnswerType = ZoomPollQuestionAndAnswerType_1.default;
const ZoomPollStatus_1 = __importDefault(require("./types/ZoomPollStatus"));
exports.ZoomPollStatus = ZoomPollStatus_1.default;
const ZoomLoginMethod_1 = __importDefault(require("./types/ZoomLoginMethod"));
exports.ZoomLoginMethod = ZoomLoginMethod_1.default;
const ZoomPollType_1 = __importDefault(require("./types/ZoomPollType"));
exports.ZoomPollType = ZoomPollType_1.default;
const ZoomRecordingType_1 = __importDefault(require("./types/ZoomRecordingType"));
exports.ZoomRecordingType = ZoomRecordingType_1.default;
const ZoomMeetingOrWebinarType_1 = __importDefault(require("./types/ZoomMeetingOrWebinarType"));
exports.ZoomMeetingOrWebinarType = ZoomMeetingOrWebinarType_1.default;
const ZoomMeetingType_1 = __importDefault(require("./types/ZoomMeetingType"));
exports.ZoomMeetingType = ZoomMeetingType_1.default;
// Import shared constants
const DEFAULT_ZOOM_HOSTNAME_1 = __importDefault(require("./shared/constants/DEFAULT_ZOOM_HOSTNAME"));
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
const initZoomAPI = (config = {}) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Create a new API instance
    const api = {};
    // Determine Zoom host
    const zoomHost = ((_b = (_a = config.zoomHost) !== null && _a !== void 0 ? _a : process.env.ZOOM_HOST) !== null && _b !== void 0 ? _b : DEFAULT_ZOOM_HOSTNAME_1.default);
    // Create a fully filled-in zoomApiConfig
    let zoomAPIConfig;
    if ((config.key || process.env.ZOOM_KEY)
        && (config.secret || process.env.ZOOM_SECRET)) {
        // Find key
        const key = ((_c = config.key) !== null && _c !== void 0 ? _c : process.env.ZOOM_KEY);
        if (!key) {
            throw new ZACCLError_1.default({
                message: 'Zoom API key not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // Find secret
        const secret = ((_d = config.secret) !== null && _d !== void 0 ? _d : process.env.ZOOM_SECRET);
        if (!secret) {
            throw new ZACCLError_1.default({
                message: 'Zoom API secret not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // Key and secret provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.JWT,
            zoomHost,
            key,
            secret,
        };
    }
    else if (config.token || process.env.ZOOM_TOKEN) {
        // Find token
        const token = ((_e = config.token) !== null && _e !== void 0 ? _e : process.env.ZOOM_TOKEN);
        if (!token) {
            throw new ZACCLError_1.default({
                message: 'Zoom API token not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // Token provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.Token,
            zoomHost,
            token,
        };
    }
    else if ((config.clientId || process.env.ZOOM_CLIENT_ID)
        && (config.clientSecret || process.env.ZOOM_CLIENT_SECRET)
        && (config.accountId || process.env.ZOOM_ACCOUNT_ID)) {
        // Find clientId
        const clientId = ((_f = config.clientId) !== null && _f !== void 0 ? _f : process.env.ZOOM_CLIENT_ID);
        if (!clientId) {
            throw new ZACCLError_1.default({
                message: 'Zoom OAuth Client ID not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // Find clientSecret
        const clientSecret = ((_g = config.clientSecret) !== null && _g !== void 0 ? _g : process.env.ZOOM_CLIENT_SECRET);
        if (!clientSecret) {
            throw new ZACCLError_1.default({
                message: 'Zoom OAuth Client Secret not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // Find accountId
        const accountId = ((_h = config.accountId) !== null && _h !== void 0 ? _h : process.env.ZOOM_ACCOUNT_ID);
        if (!accountId) {
            throw new ZACCLError_1.default({
                message: 'Zoom OAuth Account ID not included',
                code: ErrorCode_1.default.CredentialsNotIncluded,
            });
        }
        // OAuth credentials provided
        zoomAPIConfig = {
            type: ZoomAPIConfigType_1.default.OAuth,
            zoomHost,
            clientId,
            clientSecret,
            accountId,
        };
    }
    else {
        throw new ZACCLError_1.default({
            message: 'Missing Zoom credentials. Either include key+secret or include token or include clientId+clientSecret+accountId via initialization function or via environment variables. See README.',
            code: ErrorCode_1.default.CredentialsNotIncluded,
        });
    }
    // Generate a visitEndpoint function
    const visitEndpoint = (0, genVisitEndpoint_1.default)(zoomAPIConfig);
    // Create a pack of info that's used to initialize each endpoint category
    const initPack = {
        visitEndpoint,
        api,
    };
    // Initialize and add endpoint categories
    api.cloudRecording = new ECatCloudRecording_1.default(initPack);
    api.meeting = new ECatMeeting_1.default(initPack);
    api.user = new ECatUser_1.default(initPack);
    api.webinar = new ECatWebinar_1.default(initPack);
    api.group = new ECatGroup_1.default(initPack);
    // Return api instance
    return api;
};
exports.default = initZoomAPI;
//# sourceMappingURL=index.js.map