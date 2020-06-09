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
   * @param {string} str - String that might need to be double encoded
   * @returns {string} - processed string
   */
  doubleEncodeIfNeeded: (str) => {
    // Variable to decide whether to double encode str
    const encodingRequired = str.startsWith('/') || str.includes('//');

    return (
      encodingRequired
        ? encodeURIComponent(encodeURIComponent(str))
        : str
    );
  },

  /**
   * Returns true if string is in the format yyyy-mm-dd
   * @author Aryan Pandey
   * @param {string} date - date string that needs to be validated
   * @returns {boolean} true if valid, false otherwise
   */
  validateDate: (date) => {
    // Check if valid string passed
    if (typeof date !== 'string') {
      return false;
    }
    const regex = /\d{4}-([1-9]|0[1-9]|1[012])-([1-9]|0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  },
};
