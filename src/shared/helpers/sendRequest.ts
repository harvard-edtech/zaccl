// Import libs
import axios from 'axios';
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
    const response = await axios({
      method,
      url,
      headers,
      data: opts.params,
    });

    // Only return part of the axios response
    return {
      body: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (err) {
    // Axios throws an error if the request status indicates an error
    // sendRequest is supposed to resolve if the request went through, whether
    // the status indicates an error or not.
    if (err.response) {
      // Resolve with response
      return Promise.resolve(err.response);
    }
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
