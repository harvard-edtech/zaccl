// Import qs
import qs from 'qs';

// Import ZACCLError
import ZACCLError from '../classes/ZACCLError';

// Import shared types
import ErrorCode from '../types/ErrorCode';

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
const sendRequest = async (
  opts: {
    host: string,
    path: string,
    method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
    params?: { [k: string]: any },
    headers?: { [k: string]: string },
    numRetries?: number,
  },
): Promise<{
  body: any,
  status: number,
  headers: { [k: string]: string },
}> => {
  // Set max number of retries if not defined
  const numRetries = (opts.numRetries ?? 0);

  // Use default method if applicable
  const method = (opts.method ?? 'GET');

  // Stringify parameters
  const stringifiedParams = qs.stringify(
    opts.params ?? {},
    {
      encodeValuesOnly: true,
      arrayFormat: 'brackets',
    },
  );

  // Create url (include query if GET)
  const query = (method === 'GET' ? `?${stringifiedParams}` : '');
  let url;
  if (!opts.host) {
    // No host included at all. Just send to a path
    url = `${opts.path}${query.length > 1 ? query : ''}`;
  } else {
    url = `https://${opts.host}${opts.path}${query.length > 1 ? query : ''}`;
  }

  // Update headers
  const headers = opts.headers || {};
  if (!headers['Content-Type']) {
    // Form encoded
    headers['Content-Type'] = 'application/json';
  }

  // Send request
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(opts.params) : undefined,
    });

    // Parse response body (try JSON first, fall back to text)
    let body: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    // Convert Headers to a plain object
    const responseHeaders: { [k: string]: string } = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Return response (fetch does not throw on non-2xx statuses, so all
    // HTTP responses resolve here, matching the original behavior where
    // both success and error-with-response resolved)
    return {
      body,
      status: response.status,
      headers: responseHeaders,
    };
  } catch (err) {
    // Fetch only throws on network failures (not HTTP error statuses)
    // Request failed! Check if we have more attempts
    if (numRetries > 0) {
      // Update options with one less retry
      return sendRequest({
        ...opts,
        numRetries: numRetries - 1,
      });
    }

    // No tries left
    throw new ZACCLError({
      message: 'We encountered an error when trying to send a network request. If this issue persists, contact an admin.',
      code: ErrorCode.NetworkError,
    });
  }
};

export default sendRequest;
