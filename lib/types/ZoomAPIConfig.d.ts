/**
 * Configuration description for Zoom API
 * @author Gabe Abrams
 */
declare type ZoomAPIConfig = (({
    key: string;
    secret: string;
} | {
    token: string;
}) & {
    zoomHost?: string;
});
export default ZoomAPIConfig;
