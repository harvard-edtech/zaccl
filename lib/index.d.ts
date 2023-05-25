import ZoomAPI from './types/ZoomAPI';
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
declare const initZoomAPI: (config: {
    zoomHost: string;
    clientId?: string;
    clientSecret?: string;
    accountId?: string;
}) => ZoomAPI;
export default initZoomAPI;
