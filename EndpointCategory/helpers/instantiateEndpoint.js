/** Initializes an endpoint instance function
 * @author Aryan Pandey
 */

const ZACCLError = require('../../ZACCLError');
const ERROR_CODES = require('../../ERROR_CODES');
const utils = require('./utils');

/**
 * Initialize an endpoint instance function
 * @author Aryan Pandey
 * @param {string} action - human-readable text describing the current action
 * @param {function} endpointCoreFunction - the core function to call in the
 *   custom context
 * @param {API} api - the top-level api instance
 * @param {string[]} [requiredParams] - list of required parameters
 * @param {object} [paramTypes] - object containing param name as key and
 *   expected type as value
 * @return {function} usable instance endpoint
 */
module.exports = (config) => {
  // Destructure config
  const {
    action,
    endpointCoreFunction,
    api,
    requiredParams,
    paramTypes,
  } = config;

  return async (opts = {}) => {
    // Make sure all required parameters are included
    if (requiredParams) {
      // Check that all required parameters are not undefined
      requiredParams.forEach((requiredParam) => {
        if (opts[requiredParam] === undefined) {
          // Found an excluded required parameter
          throw new ZACCLError({
            message: `We could not ${action} because the ${requiredParam} parameter is required but was excluded.`,
            code: ERROR_CODES.ENDPOINT_CALL_EXCLUDED_REQUIRED_PARAM,
          });
        }
      });
    }

    // Check if paramTypes map was passed for this endpoint
    if (paramTypes) {
      Object.keys(paramTypes).forEach((param) => {
        // Check if specific param was passed in as an option
        if (opts[param]) {
          // Ensure actual type of param matches desired type
          opts[param] = utils.enforceParamType(param, opts[param],
            paramTypes[param]);
          // If type is not fixable, ZACCL Error is thrown
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
      // Destructure arguments and
      // separate extraneous arguments from options object
      const {
        postProcessor,
        errorMap,
        ...endpointOptions
      } = options;

      // Initialize with generic error message
      let zoomErrorMessage = 'An unknown error occurred';

      // Declare pages array that will hold concatenated responses
      const pages = [];

      const fetchPage = async () => {
        let response;
        try {
        // Call method with only necessary arguments
          response = await api._visitEndpoint(endpointOptions);
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

          // Check status to see if its in the error map
          if (errorMap[status]) {
            if (typeof errorMap[status] === 'string') {
            // Found the error message
              zoomErrorMessage = errorMap[status];
            } else if (body.code) {
            // Check for nested error message
              if (typeof errorMap[status][body.code] === 'string') {
              // Found nested error message
                zoomErrorMessage = errorMap[status][body.code];
              } else if (body.message) {
              // errorMap[status][code] did not return err message
              // so we check body
                if (typeof body.message === 'string') {
                  zoomErrorMessage = body.message;
                }
              }
            }
          } else if (body.message) {
          // Error message not in the error map so check body
            if (typeof body.message === 'string') {
              zoomErrorMessage = body.message;
            }
          }
          // Note: if none of the conditionals hit,
          // zoomErrorMessage defaults to generic error message

          const errorMessage = `We couldn't ${action} because an error occurred: ${zoomErrorMessage}`;
          const errorCode = `ZOOM${status}${body.code ? `-${body.code}` : ''}`;

          throw new ZACCLError({
            message: errorMessage,
            code: errorCode,
          });
        }

        // Run the post-processor, throwing any errors it produces
        // and convert non-ZACCLError errors into ZACCLErrors with better text
        let modifiedResponse = response;
        if (postProcessor) {
          try {
            modifiedResponse = postProcessor(response);
          } catch (err) {
          // Turn into ZACCLError if not already
            let newError = err;
            if (!err.isZACCLError) {
              newError = new ZACCLError(err);
              newError.message = 'An error occurred while post-processing the response from Zoom.';
              newError.code = ERROR_CODES.POST_PROCESSING_ERROR;
            }
            throw newError;
          }
        }

        // Response is valid. Add response to pages
        pages.push(modifiedResponse);

        // Check for next page
        if (modifiedResponse.body.next_page_token) {
          // Add next page token to the params
          endpointOptions.params.next_page_token = (
            modifiedResponse.body.next_page_token
          );

          // Fetch next page recursively
          return fetchPage();
        }

        // We don't need to fetch any more pages.
        // Concatenate pages if necessary
        const allData = (
          pages.length === 1
            ? pages[0]
            : [].concat(...pages)
        );

        // Return all responses
        return allData;
      };

      // Fetch first page to start a chain
      return fetchPage();
    };

    // Make sure endpointCoreFunction can be bound
    if (!endpointCoreFunction.prototype) {
      // Cannot be bound!
      throw new ZACCLError({
        message: 'We ran into an internal error while attempting to bind the context of an endpoint function.',
        code: ERROR_CODES.ENDPOINT_BIND_ERROR,
      });
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
      const { body } = await runCoreFunction(opts);
      return body;
    } catch (err) {
      let newError = err;
      // Convert to non ZACCL errors to ZACCL errors
      if (!err.isZACCLError) {
        newError = new ZACCLError(err);
        newError.message = 'An unknown error occurred while sending requests to Zoom.';
        newError.code = ERROR_CODES.UNKNOWN_ERROR;
      }
      throw newError;
    }
  };
};
