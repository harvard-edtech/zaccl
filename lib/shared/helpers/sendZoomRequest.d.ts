import path from 'path';
import ZoomAPIConfig from '../../types/ZoomAPIConfig';
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
declare const sendZoomRequest: (opts: {
    path: string;
    method: ('GET' | 'POST' | 'PUT' | 'DELETE');
    params?: {
        [k: string]: any;
    };
    zoomAPIConfig: ZoomAPIConfig;
}) => Promise<{
    body: any;
    status: number;
    headers: {
        [k: string]: string;
    };
}>;
export default sendZoomRequest;
