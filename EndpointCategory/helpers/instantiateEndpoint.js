/** Initializes an enpoint instance function
 * @author Aryan Pandey
 */

const ZACCLError = require('../../ZACCLError');
const errorCodes = require('../../ERROR_CODES');

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

  return async (opts = {}) => {
    // Make sure all required parameters are included
    if (requiredParams) {
      // Check that all required parameters are not undefined
      requiredParams.forEach((requiredParam) => {
        if (opts[requiredParam] === undefined) {
          // Found an excluded required parameter
          return Promise.reject(new ZACCLError({
            message: `We could not ${action} because the ${requiredParam} parameter is required but was excluded.`,
            // Commented out because Error Codes are not defined yet
            // code: errorCodes.endpointCallExcludedRequiredParam,
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
    const visitEndpoint = (options) => {
      // call api._visitEndpoint
      return api._visitEndpoint(options)
        .catch((err) => {
          // Detect errors using the errorMap. Throw any error
          // Assuming standard error response from Zoom API
          return Promise.reject(new ZACCLError({
            message: errorMap[err.code],
            code: err.code,
          }));
        })

        .then((response) => {
          // Run the post-processor, throwing any errors it produces
          // and convert non-ZACCLError errors into ZACCLErrors with better text
          options.postProcessor(response)
            .catch((err) => {
              // Turn into CACCLError if not already
              let newError = err;
              if (!err.isZACCLError) {
                newError = new ZACCLError(err);
                // newError.code = errorCodes.unnamedEndpointError;
              }

              // TODO: add better message text to the error
              // newError.message =

              throw newError;
            })

            .then((modifiedResponse) => {
              return modifiedResponse;
            });
        });
    };

    // Make sure endpointCoreFunction can be bound
    if (!endpointCoreFunction.prototype) {
      // Cannot be bound!
      return Promise.reject(
        new ZACCLError({
          message: 'We ran into an internal error while attempting to bind the context of an endpoint function.',
          // Commented out because Error Codes are not defined yet
          // code: errorCodes.couldNotBindEndpoint,
        })
      );
    }

    // build the context: { api, visitEndpoint }
    const ctx = {
      visitEndpoint,
      api,
    };

    // Binding the context to the core function
    const runCoreFunction = endpointCoreFunction.bind(ctx)(opts);

    // call the core function, catching errors
    return runCoreFunction
      .catch((err) => {
        // note: if an error occurs, it's a network error. Create a ZACCLError
        return Promise.reject(
          new ZACCLError({
            message: 'We ran into a Network Error.',
            code: errorCodes.NETWORK_ERROR,
          })
        );
      })

      .then((response) => {
      // extract the body of the response and return that
        return response.body;
      });
  };
};
