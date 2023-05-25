import ZoomAPIConfig from '../../types/ZoomAPIConfig';
/**
 * Get a current Zoom access token
 * @author Gabe Abrams
 * @param zoomAPIConfig the original config for the Zoom API
 * @returns access token that's currently valid
 */
declare const getCurrentAccessToken: (zoomAPIConfig: ZoomAPIConfig) => Promise<string>;
export default getCurrentAccessToken;
