/** Initializes an enpoint instance function
 * @author Aryan Pandey
 */

const ZACCLError = require('../../ZACCLError');
/**
 * Initialize an endpoint instance function
 * @author Aryan Pandey
 * @param {string} action - human-readable text describing the current action
 * @param {function} endpointCoreFunction - the core function to call in the
 *   custom context
 * @param {API} api - the top-level api instance
 * @param {string[]} [requiredParams] - list of required parameters
 * @param {object} [errorMap] - a map listing status codes and their
 *   respective errors
 * @param {object|string} [errorMap[statusCode]] - either a map
 *   (error code => string error message) or an error message if the message
 *   is not dependent upon error code
 * @return {function} usable instance endpoint
 */
module.exports = (config) => {
  // Destructure config
  const {
    action,
    endpointCoreFunction,
    api,
    requiredParams,
    errorMap,
  } = config;

  return async (opts) => {
    // Make sure all required parameters are included
    if (requiredParams) {
      // Check that all required parameters are not undefined
      requiredParams.forEach((requiredParam) => {
        if(opts[requiredParam] === undefined) {
          // Found an excluded required parameter
          return Promise.reject(new ZACCLError({
            message: `We could not ${action} because the ${requiredParam} parameter is required but was excluded.`,
            // Commented out because Error Codes are not defined yet
            //code: errorCodes.endpointCallExcludedRequiredParam,
          }));
        }
      });
    }

    // Create the visitEndpoint function by wrapping the api.visitEndpoint
    // function and adding in the postProcessor

    /**
     * Visit the endpoint, detecting errors and running the post-processor
     *   if no errors
     * @author Aryan Pandey
     * @async
     * @param {string} path - the url path to hit
     * @param {string} [method=GET] - the https method to use
     * @param {object} [params] - the request params to include
     * @param {function} [postProcessor] - a function that takes the response
     *   from the visitEndpoint function and either throws a ZACCLError OR the
     *   modified response OR a normal Error (will be translated to an
     *   "unknown error has occurred" error)
     */
    const visitEndpoint = (opts) => {
      // TODO: call api._visitEndpoint

      // TODO: detect errors using the errorMap. Throw any error

      // TODO: Run the post-processor, throwing any errors it produces
      // and converting non-ZACCLError errors into ZACCLErrors with better text
    };

    // TODO: build the context: { api, visitEndpoint }

    // TODO: call the core function, catching errors
    // note: if an error occurs, it's a network error. Create a ZACCLError

    // TODO: extract the body of the response and return that
  };
};
