/**
 * Function that generates testing stub for sendZoomRequest
 * @author Aryan Pandey
 * @param {number} numTokensToGenerate - number of nextPageTokens to iterate to.
 *   API stops sending a nextPageToken when this limit is reached
 * @returns {function} stub for sendZoomRequest
 */
const genStubAPIRequest = (numTokensToGenerate) => {
  /**
   * Stub replacement for sendZoomRequest that responds with the request
   *   params in the body of the response
   * @async
   * @author Aryan Pandey
   * @param {string} path - the url path to hit
   * @param {string} key - the Zoom API key to use to generate credentials
   * @param {string} secret - Zoom API secret to use to generate credentials
   * @param {string} [method=GET] - the https method to use
   * @param {object} [params] - the request params to include
   * @return {object} fake API response object with params in the body
   */
  return async (stubOpts) => {
    const {
      path,
      method,
      params,
    } = stubOpts;

    // Check if nextPageToken is present
    let nextPageToken;
    if (params && params.next_page_token) {
      // Extract token
      nextPageToken = Number.parseInt(params.next_page_token);

      // Check if we have generated enough tokens
      nextPageToken = (
        nextPageToken < numTokensToGenerate
          ? nextPageToken + 1
          : undefined
      );
    }

    // Extract request to send back from opts
    const {
      key,
      secret,
      ...endpointRequest
    } = stubOpts;

    // Make shallow copy of request object to send back
    const meetings = { ...endpointRequest };
    const token = { ...endpointRequest };

    // Make shallow copy of nested object
    meetings.params = { ...params };
    token.params = { ...params };


    return {
      body: {
        path,
        method,
        params,
        next_page_token: nextPageToken,
        // Send response object in meetings and token so that respective
        // postprocessors will extract automatically to body
        meetings,
        token,
      },
    };
  };
};

module.exports = genStubAPIRequest;
