const axios = require('axios');
const qs = require('qs');

/**
 * Sends and retries an http request
 * @author Gabe Abrams
 * @async
 * @param {string} host - host to send request to
 * @param {string} path - path to send request to
 * @param {string} [method=GET] - http method to use
 * @param {object} [params] - body/data to include in the request
 * @param {object} [headers] - headers to include in the request
 * @param {number} [numRetries=0] - number of times to retry the request if it
 *   fails
 * @return {object} Returns { body, status, headers } on
 *   success
 */
const sendRequest = (options) => {
  // Set max number of retries if not defined
  const numRetries = (options.numRetries ? options.numRetries : 0);

  // Use default method if applicable
  const method = options.method || 'GET';

  // Stringify parameters
  const stringifiedParams = qs.stringify(options.params || {}, {
    encodeValuesOnly: true,
    arrayFormat: 'brackets',
  });

  // Create url (include query if GET)
  const query = (method === 'GET' ? `?${stringifiedParams}` : '');
  let url;
  if (!options.host) {
    // No host included at all. Just send to a path
    url = `${options.path}${query.length > 1 ? query : ''}`;
  } else {
    url = `https://${options.host}${options.path}${query.length > 1 ? query : ''}`;
  }

  // Update headers
  const headers = options.headers || {};
  if (!headers['Content-Type']) {
    // Form encoded
    headers['Content-Type'] = 'application/json';
  }

  // Send request
  return axios({
    method,
    url,
    headers,
    data: options.params,
  })
    .catch((err) => {
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
        const newOptions = options;
        newOptions.numRetries -= 1;
        return sendRequest(newOptions);
      }

      // No tries left
      throw new Error('We encountered an error when trying to send a network request. If this issue persists, contact an admin.');
    })
    .then((response) => {
      return {
        body: response.data,
        status: response.status,
        headers: response.headers,
      };
    });
};

module.exports = sendRequest;
