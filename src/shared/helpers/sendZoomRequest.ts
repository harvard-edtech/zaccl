// Import libs
import path from 'path';
import jwt from 'jsonwebtoken';

// Import shared types
import ZoomAPIConfig from '../../types/ZoomAPIConfig';

// Import shared helpers
import sendRequest from './sendRequest';
import getCurrentOAuthAccessToken from './getCurrentOAuthAccessToken';

// Import shared constants
import HARVARD_APIGEE_HOSTNAME_SUFFIX from '../constants/HARVARD_APIGEE_HOSTNAME_SUFFIX';
import ZOOM_HOSTNAME from '../constants/DEFAULT_ZOOM_HOSTNAME';
import ZoomAPIConfigType from '../../types/ZoomAPIConfigType';
import JWT_EXPIRY_SEC from '../constants/JWT_EXPIRY_SEC';

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
const sendZoomRequest = async (
  opts: {
    path: string,
    method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
    params?: { [k: string]: any },
    zoomAPIConfig: ZoomAPIConfig,
  },
) => {
  const {
    method,
    params,
    zoomAPIConfig,
  } = opts;

  // Initialize request variables
  const headers: { [k: string]: string } = {};
  let fullPath: string;

  /*----------------------------------------*/
  /* ---------------- OAuth --------------- */
  /*----------------------------------------*/

  if (zoomAPIConfig.type === ZoomAPIConfigType.OAuth) {
    // Get the current access token
    const accessToken = await getCurrentOAuthAccessToken(zoomAPIConfig);

    // Add token to the request
    headers.Authorization = `Bearer ${accessToken}`;

    // Determine full path
    fullPath = path.join('/v2', opts.path);
  }

  /*----------------------------------------*/
  /* ------------ JWT or Token ------------ */
  /*----------------------------------------*/

  if (
    zoomAPIConfig.type === ZoomAPIConfigType.JWT
    || zoomAPIConfig.type === ZoomAPIConfigType.Token
  ) {
    // Check if our host is the Harvard HUIT Apigee system
    const usingHarvardApigee = (
      zoomAPIConfig.zoomHost
      && zoomAPIConfig.zoomHost.indexOf(HARVARD_APIGEE_HOSTNAME_SUFFIX) >= 0
    );

    // Check if we have a token
    let token;
    if ((opts as any).zoomAPIConfig.token) {
      // Use existing token
      ({ token } = (opts as any));
    } else {
      // Generate a token
      token = jwt.sign(
        {
          iss: (opts as any).key,
          exp: (Date.now() + (JWT_EXPIRY_SEC * 1000)),
        },
        (opts as any).secret,
      );
    }

    // Create headers
    if (usingHarvardApigee) {
      // Using Harvard Apigee system
      headers['X-Api-Key'] = token;
    } else {
      // Directly contacting Zoom
      headers.Authorization = `Bearer ${token}`;
    }

    // Find the full path
    fullPath = (
      usingHarvardApigee
        ? opts.path.split('?')[0]
        // ^ Apigee doesn't support versioning yet (as of 12/16/20)
        : path.join('/v2', opts.path)
    );
  }

  /* ---------------------- Send the Request ---------------------- */

  return sendRequest({
    params,
    method,
    headers,
    path: fullPath,
    host: zoomAPIConfig.zoomHost,
  });
};

export default sendZoomRequest;
