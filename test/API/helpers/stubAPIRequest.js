const genStubAPIRequest = () => {
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

    return {
      body: {
        path,
        method,
        params,
      },
    };
  };
};

module.exports = genStubAPIRequest;
