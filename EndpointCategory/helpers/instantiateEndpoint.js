/** Initializes an enpoint instance function
 * @author Aryan Pandey
 */

const ZACCLError = require('../../ZACCLError');
const ERROR_CODES = require('../../ERROR_CODES');

/**
 * Initialize an endpoint instance function
 * @author Aryan Pandey
 * @param {string} action - human-readable text describing the current action
 * @param {function} endpointCoreFunction - the core function to call in the
 *   custom context
 * @param {API} api - the top-level api instance
 * @param {string[]} [requiredParams] - list of required parameters
 * @return {function} usable instance endpoint
 */
module.exports = (config) => {
  // Destructure config
  const {
    action,
    endpointCoreFunction,
    api,
    requiredParams,
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
            code: ERROR_CODES.endpointCallExcludedRequiredParam,
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
     * @param {object} [errorMap] - a map listing status codes and their
     *   respective errors
     * @param {object|string} [errorMap[statusCode]] - either a map
     *   (error code => string error message) or an error message if the message
     *   is not dependent upon error code
     * @return {object} body of the response from Zoom
     */
    const visitEndpoint = async (options) => {
      let response;
      try {
        response = await api._visitEndpoint(options);
      } catch (err) {
        // We encountered an error while sending the request
        throw new ZACCLError({
          message: (
            err.message
            || 'An unknown error occurred while sending a request to Zoom.'
          ),
          code: err.code || ERROR_CODES.UNKNOWN_NETWORK_ERROR,
        });
      }

      // Error check
      const { status, body } = response;
      if (status < 200 || status >= 300) {
        // A Zoom error occurred

        // Determine the error message
        // TODO: Work on this:
        // 1. Check the status to see if that's in the errorMap
        // 2. Check body.code for the sub code and see if that's in the error map
        // 3. If we don't have an error given by the error map, check for and use body.message
        // 4. If we still don't have an error message, use a generic one.
        const errorMessage = 'DETERMINED BY LOGIC ABOVE';
        // ^ for all these, make sure you take advantage of the action
        // Example: `We couldn't ${action} because an error occurred: ${message}`

        // Determine the error code
        const errorCode = `ZOOM${status}${body.code ? `-${body.code}` : ''}`;

        throw new ZACCLError({
          message: errorMessage,
          code: errorCode,
        });
      }

      // Run the post-processor, throwing any errors it produces
      // and convert non-ZACCLError errors into ZACCLErrors with better text
      let modifiedResponse = response;
      if (options.postProcessor) {
        try {
          modifiedResponse = options.postProcessor(response);
        } catch (err) {
          // Turn into CACCLError if not already
          let newError = err;
          if (!err.isZACCLError) {
            newError = new ZACCLError(err);
            // TODO: set a default message, something like "An error occurred while post-processing the response from Zoom."
            // TODO: add an error code to ERROR_CODES for post-processor errors
          }

          // TODO: add better message text to the error
          // newError.message =

          throw newError;
        }
      }

      // Return the body of the response
      return modifiedResponse.body;
    };

    // Make sure endpointCoreFunction can be bound
    if (!endpointCoreFunction.prototype) {
      // Cannot be bound!
      return Promise.reject(
        new ZACCLError({
          message: 'We ran into an internal error while attempting to bind the context of an endpoint function.',
          code: ERROR_CODES.couldNotBindEndpoint,
        })
      );
    }

    // build the context: { api, visitEndpoint }
    const ctx = {
      visitEndpoint,
      api,
    };

    // Binding the context to the core function
    const runCoreFunction = endpointCoreFunction.bind(ctx);

    // call the core function, catching errors
    try {
      const body = runCoreFunction(opts);
      return body;
    } catch (err) {
      if (err.isZACCLError) {
        throw err;
      }

      // TODO: throw new ZACCLError with a 'An unknown error occurred while sending requests to Zoom.'
    }
  };
};
