// Import libraries
const path = require('path');
const jwt = require('jsonwebtoken');

// Import local modules
const sendRequest = require('../helpers/sendRequest');

// Import constants
const HARVARD_APIGEE_HOSTNAME_SUFFIX = require('../constants/HARVARD_APIGEE_HOSTNAME_SUFFIX');
const ZOOM_HOSTNAME = require('../constants/ZOOM_HOSTNAME');

/* -------------------------- Constants ------------------------- */

// Constants
const EXPIRY_SEC = 60;

/* -------------------------- Function -------------------------- */

/**
 * Send an API request to Zoom
 * @author Gabe Abrams
 * @async
 * @param {string} path - the url path to hit
 * @param {string} [key] - the Zoom API key to use to generate credentials.
 *   If excluded, a token must be included
 * @param {string} [secret] - the Zoom API secret to use to generate
 *   credentials. If excluded, a token must be included
 * @param {string} [token=generated from key+secret] - token to use for request
 *   authentication. If host points to Zoom, this token is used instead of
 *   generating a token with the key and secret. If host points to the
 *   Harvard Zoom API gateway, the token is included in the X-Api-Key header
 * @param {string} [host=api.zoom.us] - the host to contact
 * @param {string} [method=GET] - the https method to use
 * @param {object} [params] - the request params to include
 */
module.exports = async (opts) => {
  const {
    method,
    params,
    key,
    secret,
    host,
  } = opts;

  // Check if our host is the Harvard HUIT Apigee system
  const usingHarvardApigee = (
    host
    && host.indexOf(HARVARD_APIGEE_HOSTNAME_SUFFIX) >= 0
  );

  /* ------------------ Make sure we have a token ----------------- */

  let token;
  if (opts.token) {
    // Use existing token
    ({ token } = opts);
  } else {
    // Generate a token
    token = jwt.sign(
      {
        iss: key,
        exp: (Date.now() + (EXPIRY_SEC * 1000)),
      },
      secret
    );
  }

  /* ----------------------- Create Headers ----------------------- */

  const headers = {};

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
    host: (host || ZOOM_HOSTNAME),
  });
};
