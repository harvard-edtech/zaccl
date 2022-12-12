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
/**
 * Initialize Zoom api
 * @author Gabe Abrams
 * @param [zoomApiConfig] object containing all arguments
 * @param {string} [zoomApiConfig.key] the Zoom API key to use to generate
 *   credentials. If excluded, a token must be included
 * @param {string} [zoomApiConfig.secret] the Zoom API secret to use to generate
 *   credentials. If excluded, a token must be included
 * @param {string} [zoomApiConfig.token=generated from key+secret] token to use
 *   for request authentication. If host points to Zoom, this token is used
 *   instead of generating a token with the key and secret. If host points to
 *   the Harvard Zoom API gateway, the token is included in the X-Api-Key
 *   header. If excluded, a token must be included
 * @param {string} [zoomApiConfig.zoomHost=api.zoom.us] the hostname of Zoom or
 *   a gateway that leads to Zoom (i.e. Apigee)
 * @param {boolean} [zoomApiConfig.dontUseDefaultThrottleRules=false] if true,
 *   does not use default throttle rules,
 *   as defined in constants/ZOOM_THROTTLE_LIMIT_RULES.js
 */
var initZoomAPI = function (zoomApiConfig) {
    // Create a new API instance
    var api = {};
    // Generate a visitEndpoint function
    var visitEndpoint = (0, genVisitEndpoint_1.default)(zoomApiConfig);
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