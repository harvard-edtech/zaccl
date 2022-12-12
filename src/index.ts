// Import shared types
import ZoomAPI from './types/ZoomAPI';

// Import shared helpers
import genVisitEndpoint from './shared/helpers/genVisitEndpoint';

// Import endpoint categories
import ECatCloudRecording from './endpoints/ECatCloudRecording';
import ECatMeeting from './endpoints/ECatMeeting';
import ECatUser from './endpoints/ECatUser';
import ECatWebinar from './endpoints/ECatWebinar';

// Import shared types
import ZoomAPIConfig from './types/ZoomAPIConfig';
import InitPack from './shared/types/InitPack';

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
const initZoomAPI = (zoomApiConfig: ZoomAPIConfig) => {
  // Create a new API instance
  const api: ZoomAPI = ({} as ZoomAPI);

  // Generate a visitEndpoint function
  const visitEndpoint = genVisitEndpoint(zoomApiConfig);

  // Create a pack of info that's used to initialize each endpoint category
  const initPack: InitPack = {
    visitEndpoint,
    api,
  };

  // Initialize and add endpoint categories
  api.cloudRecording = new ECatCloudRecording(initPack);
  api.meeting = new ECatMeeting(initPack);
  api.user = new ECatUser(initPack);
  api.webinar = new ECatWebinar(initPack);

  // Return api instance
  return api;  
};

export default initZoomAPI;
