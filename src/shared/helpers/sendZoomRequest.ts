// Import libs
import path from 'path';
import jwt from 'jsonwebtoken';

// Import shared types
import ZoomAPIConfig from '../../types/ZoomAPIConfig';

// Import shared helpers
import sendRequest from './sendRequest';

// Import shared constants
import HARVARD_APIGEE_HOSTNAME_SUFFIX from '../constants/HARVARD_APIGEE_HOSTNAME_SUFFIX';
import ZOOM_HOSTNAME from '../constants/ZOOM_HOSTNAME';

// How long to wait before expiring requests
const EXPIRY_SEC = 60;

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
  opts: (
    {
      path: string,
      method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
      params?: { [k: string]: any },
      zoomAPIConfig: ZoomAPIConfig,
    }
  ),
) => {
  const {
    method,
    params,
    zoomAPIConfig,
  } = opts;

  // Check if our host is the Harvard HUIT Apigee system
  const usingHarvardApigee = (
    zoomAPIConfig.zoomHost
    && zoomAPIConfig.zoomHost.indexOf(HARVARD_APIGEE_HOSTNAME_SUFFIX) >= 0
  );

  /* ------------------ Make sure we have a token ----------------- */

  let token;
  if ((opts as any).zoomAPIConfig.token) {
    // Use existing token
    ({ token } = (opts as any));
  } else {
    // Generate a token
    token = jwt.sign(
      {
        iss: (opts as any).key,
        exp: (Date.now() + (EXPIRY_SEC * 1000)),
      },
      (opts as any).secret,
    );
  }

  /* ----------------------- Create Headers ----------------------- */

  const headers: { [k: string]: string } = {};

  if (usingHarvardApigee) {
    // Using Harvard Apigee system
    headers['X-Api-Key'] = token;
  } else {
    // Directly contacting Zoom
    headers.Authorization = `Bearer ${token}`;
  }

  /* --------------------- Find the full path --------------------- */

  const fullPath = (
    usingHarvardApigee
      ? opts.path.split('?')[0] // Apigee doesn't support versioning yet (as of 12/16/20)
      : path.join('/v2', opts.path)
  );

  /* ---------------------- Send the Request ---------------------- */

  return sendRequest({
    params,
    method,
    headers,
    path: fullPath,
    host: (zoomAPIConfig.zoomHost ?? ZOOM_HOSTNAME),
  });
};

export default sendZoomRequest;
