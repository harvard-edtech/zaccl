const path = require('path');
const jwt = require('jsonwebtoken');

const sendRequest = require('../helpers/sendRequest');

// TODO: auto-detect "429 Too Many Requests" and retry after "retry-after"

/* -------------------------- Constants ------------------------- */

// Constants
const EXPIRY_SEC = 60;

/* ------------------------- Throttlers ------------------------- */

let throttleReady = Promise.resolve();
const resetThrottle = () => {
  throttleReady = new Promise((r) => {
    setTimeout(r, 1000);
  });
};

/* -------------------------- Function -------------------------- */

/**
 * Send an API request to Zoom
 * @author Gabe Abrams
 * @async
 * @param {string} path - the url path to hit
 * @param {string} key - the Zoom API key to use to generate credentials
 * @param {string} secret - the Zoom API secret to use to generate credentials
 * @param {string} [method=GET] - the https method to use
 * @param {object} [params] - the request params to include
 */
module.exports = async (opts) => {
  const {
    method,
    params,
    key,
    secret,
  } = opts;

  /* --------------------- Deal with Throttle --------------------- */
  await throttleReady;
  resetThrottle();

  /* ---------------------- Generate a Token ---------------------- */
  const token = jwt.sign({
    iss: key,
    exp: (Date.now() + (EXPIRY_SEC * 1000)),
  }, secret);

  /* ---------------------- Send the Request ---------------------- */
  return sendRequest({
    params,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    host: 'api.zoom.us',
    path: path.join('/v2', opts.path),
  });
};
