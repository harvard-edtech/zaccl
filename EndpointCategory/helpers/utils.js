/**
 * Set of utils for endpoints
 */

const ERROR_CODES = require('../../ERROR_CODES');

module.exports = {

  /**
   * Checks argument string to see if it needs to be encoded
   *   Double encodes and returns if needed
   *   Otherwise returns original string
   *   Function assumes valid string is passed
   * @author Aryan Pandey
   * @param {String} str - String that might need to be double encoded
   * @returns {String} - processed string
   */
  doubleEncodeIfNeeded: (str) => {
  // Variable to decide whether to double encode str
    const encodingRequired = str.startsWith('/') || str.includes('//');

    return (encodingRequired ? encodeURIComponent(encodeURIComponent(str))
      : str);
  },
};
