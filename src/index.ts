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
import ZACCLError from './shared/classes/ZACCLError';
import ErrorCode from './shared/types/ErrorCode';

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
const initZoomAPI = (
  config: {
    zoomHost: string,
    clientId?: string,
    clientSecret?: string,
    accountId?: string,
  },
) => {
  // Create a new API instance
  const api: ZoomAPI = ({} as ZoomAPI);

  // Create a fully filled-in zoomApiConfig
  const clientId = (config.clientId ?? process.env.ZOOM_CLIENT_ID);
  const clientSecret = (config.clientSecret ?? process.env.ZOOM_CLIENT_SECRET);
  const accountId = (config.accountId ?? process.env.ZOOM_ACCOUNT_ID);
  if (!clientId || !clientSecret || !accountId) {
    throw new ZACCLError({
      message: 'Missing required config value: clientId, clientSecret, or accountId is not included',
      code: ErrorCode.CredentialsNotIncluded,
    });
  }
  const zoomAPIConfig: ZoomAPIConfig = {
    zoomHost: config.zoomHost,
    clientId,
    clientSecret,
    accountId,
  };

  // Generate a visitEndpoint function
  const visitEndpoint = genVisitEndpoint(zoomAPIConfig);

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
