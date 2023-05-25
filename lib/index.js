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
/**
 * Initialize Zoom api
 * @author Gabe Abrams
 * @param config object containing all arguments
 * @param config.zoomHost Zoom API hostname
 * @param [config.clientId=process.env.ZOOM_CLIENT_ID] Zoom OAuth
 *   Client ID
 * @param [config.clientSecret=process.env.ZOOM_CLIENT_SECRET] Zoom OAuth
 *   Client Secret
 * @param [config.accountId=process.env.ZOOM_ACCOUNT_ID] Zoom OAuth
 *   Account ID
 */
var initZoomAPI = function (config) {
    var _a, _b, _c;
    // Create a new API instance
    var api = {};
    // Create a fully filled-in zoomApiConfig
    var clientId = ((_a = config.clientId) !== null && _a !== void 0 ? _a : process.env.ZOOM_CLIENT_ID);
    var clientSecret = ((_b = config.clientSecret) !== null && _b !== void 0 ? _b : process.env.ZOOM_CLIENT_SECRET);
    var accountId = ((_c = config.accountId) !== null && _c !== void 0 ? _c : process.env.ZOOM_ACCOUNT_ID);
    if (!clientId || !clientSecret || !accountId) {
        throw new ZACCLError_1.default({
            message: 'Missing required config value: clientId, clientSecret, or accountId is not included',
            code: ErrorCode_1.default.CredentialsNotIncluded,
        });
    }
    var zoomAPIConfig = {
        zoomHost: config.zoomHost,
        clientId: clientId,
        clientSecret: clientSecret,
        accountId: accountId,
    };
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