import ZoomAPIConfigType from "./ZoomAPIConfigType";
/**
 * Configuration description for Zoom API
 * @author Gabe Abrams
 */
type ZoomAPIConfig = (({
    type: ZoomAPIConfigType.JWT;
    key: string;
    secret: string;
} | {
    type: ZoomAPIConfigType.Token;
    token: string;
} | {
    type: ZoomAPIConfigType.OAuth;
    clientId: string;
    clientSecret: string;
    accountId: string;
}) & {
    zoomHost: string;
});
export default ZoomAPIConfig;
