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
 * @param {function} [postProcessor] - a function that takes the response
 *   from the visitEndpoint function and either throws a ZACCLError OR the
 *   modified response OR a normal Error (will be translated to an
 *   "unknown error has occurred" error)
 * @return {function} usable instance endpoint
 */
module.exports = (config) => {
  const {
    action,
    endpointCoreFunction,
    api,
    requiredParams,
    errorMap,
    postProcessor,
  } = config;

  return async (opts) => {
    // TODO: write pre-function code
    // - Check requirements
    // - Build context { api, visitEndpoint }

    // TODO: call the core function

    // TODO: write post-function code
    // - Detect errors using errorMap
    // - Post-process using postProcessor
    // - Make sure errors are thrown appropriately
    // - If no error, just respond with the body of the request

    // TODO: fetch following pages
  };
};
