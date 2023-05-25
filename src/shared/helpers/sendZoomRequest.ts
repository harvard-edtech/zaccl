// Import libs
import path from 'path';

// Import shared types
import ZoomAPIConfig from '../../types/ZoomAPIConfig';

// Import shared helpers
import sendRequest from './sendRequest';
import getCurrentAccessToken from './getCurrentAccessToken';

// Import shared constants
import ZOOM_HOSTNAME from '../constants/ZOOM_HOSTNAME';

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

  /* ------------------ Make sure we have a token ----------------- */

  const token = await getCurrentAccessToken(zoomAPIConfig);

  /* ----------------------- Create Headers ----------------------- */

  const headers: { [k: string]: string } = {};

  // Add token to request
  headers.Authorization = `Bearer ${token}`;

  /* --------------------- Find the full path --------------------- */

  const fullPath = path.join('/v2', opts.path);

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
