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
import ZoomAPIConfigType from './types/ZoomAPIConfigType';

// Import shared constants
import DEFAULT_ZOOM_HOSTNAME from './shared/constants/DEFAULT_ZOOM_HOSTNAME';

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
const initZoomAPI = (
  config: {
    key?: string,
    secret?: string,
    token?: string,
    zoomHost?: string,
    clientId?: string,
    clientSecret?: string,
    accountId?: string,
  } = {},
) => {
  // Create a new API instance
  const api: ZoomAPI = ({} as ZoomAPI);

  // Determine Zoom host
  const zoomHost = (
    config.zoomHost
    ?? process.env.ZOOM_HOST
    ?? DEFAULT_ZOOM_HOSTNAME
  );

  // Create a fully filled-in zoomApiConfig
  let zoomAPIConfig: ZoomAPIConfig;
  if (
    (config.key || process.env.ZOOM_KEY)
    && (config.secret || process.env.ZOOM_SECRET)
  ) {
    // Key and secret provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.JWT,
      zoomHost,
      key: (
        config.key
        ?? process.env.ZOOM_KEY
      ),
      secret: (
        config.secret
        ?? process.env.ZOOM_SECRET
      ),
    };
  } else if (config.token || process.env.ZOOM_TOKEN) {
    // Token provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.Token,
      zoomHost,
      token: (
        config.token
        ?? process.env.ZOOM_TOKEN
      ),
    };
  } else if (
    (config.clientId || process.env.ZOOM_CLIENT_ID)
    && (config.clientSecret || process.env.ZOOM_CLIENT_SECRET)
    && (config.accountId || process.env.ZOOM_ACCOUNT_ID)
  ) {
    // OAuth credentials provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.OAuth,
      zoomHost,
      clientId: (
        config.clientId
        ?? process.env.ZOOM_CLIENT_ID
      ),
      clientSecret: (
        config.clientSecret
        ?? process.env.ZOOM_CLIENT_SECRET
      ),
      accountId: (
        config.accountId
        ?? process.env.ZOOM_ACCOUNT_ID
      ),
    };
  } else {
    throw new ZACCLError({
      message: 'Missing Zoom credentials. Either include key+secret or include token or include clientId+clientSecret+accountId via initialization function or via environment variables. See README.',
      code: ErrorCode.CredentialsNotIncluded,
    });
  }

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
