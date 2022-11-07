import ZoomAPI from './types/ZoomAPI';
import ZoomAPIConfig from './types/ZoomAPIConfig';
/**
 * Initialize Zoom api
 * @author Gabe Abrams
 * @param [opts] object containing all arguments
 * @param {string} [key] the Zoom API key to use to generate credentials.
 *   If excluded, a token must be included
 * @param {string} [secret] the Zoom API secret to use to generate
 *   credentials. If excluded, a token must be included
 * @param {string} [token=generated from key+secret] token to use for
 *   request authentication. If host points to Zoom, this token is used
 *   instead of generating a token with the key and secret. If host points to
 *   the Harvard Zoom API gateway, the token is included in the X-Api-Key
 *   header. If excluded, a token must be included
 * @param {string} [zoomHost=api.zoom.us] the hostname of Zoom or a gateway
 *   that leads to Zoom (i.e. Apigee)
 * @param {boolean} [dontUseDefaultThrottleRules=false] if true, does not
 *   use default throttle rules,
 *   as defined in constants/ZOOM_THROTTLE_LIMIT_RULES.js
 */
declare const initZoomAPI: (zoomApiConfig: ZoomAPIConfig) => ZoomAPI;
export default initZoomAPI;
