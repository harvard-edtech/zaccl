/**
 * Sends and retries an http request
 * @author Gabe Abrams
 * @param {string} host host to send request to
 * @param {string} path path to send request to
 * @param {string} [method=GET] http method to use
 * @param {object} [params] body/data to include in the request
 * @param {object} [headers] headers to include in the request
 * @param {number} [numRetries=0] number of times to retry the request if it
 *   fails
 * @returns { body, status, headers } on
 *   success
 */
declare const sendRequest: (opts: {
    host: string;
    path: string;
    method: ('GET' | 'POST' | 'PUT' | 'DELETE');
    params?: {
        [k: string]: any;
    };
    headers?: {
        [k: string]: string;
    };
    numRetries?: number;
}) => Promise<{
    body: any;
    status: number;
    headers: {
        [k: string]: string;
    };
}>;
export default sendRequest;
