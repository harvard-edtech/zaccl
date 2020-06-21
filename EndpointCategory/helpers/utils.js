/**
 * Set of utils for endpoints
 */

const ERROR_CODES = require('../../ERROR_CODES');
const ZACCLError = require('../../ZACCLError');

module.exports = {

  /**
   * Checks argument string to see if it needs to be encoded
   *   Double encodes and returns if needed
   *   Otherwise returns original string
   *   Function assumes valid string is passed
   * @author Aryan Pandey
   * @param {string} str - String that might need to be double encoded
   * @returns {string} processed string
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
   * Returns formatted date string if possible,
   *   throws ZACCL Error otherwise
   * @author Aryan Pandey
   * @param {string|Date} date - string accepted by JS Date constructor
   *   or instance of Date object
   * @param {string} type - date type to include in error message for
   *   specificity
   * @returns {string} formatted date string
   */
  formatDate: (date, type) => {
    // Check if date instance passed
    if (date instanceof Date) {
      // return formatted date string
      return date.toISOString()
        .split('T')[0];
    }

    // Check if passed parameter can be accepted by the Date constructor
    const timestamp = Date.parse(date);
    if (Number.isNaN(timestamp)) {
      // Param cannot be converted to a Date object so throw an error
      throw new ZACCLError({
        message: `${type} date needs to be a JS Date instance or a string accepted by the Date constructor`,
        code: ERROR_CODES.INVALID_DATE_FORMAT,
      });
    }

    // Param can be converted to a Date instance so return formatted date
    return new Date(timestamp).toISOString()
      .split('T')[0];
  },

  /**
   * Returns parsed int if arg is a valid number,
   *   throws error otherwise
   * @author Aryan Pandey
   * @param {number} num - number that needs to be sanitized
   * @returns {number} parsed number
   */
  sanitizeInt: (num) => {
    const parsedNum = Number.parseInt(num);
    // If not a number throw a standard error
    if (Number.isNaN(parsedNum)) {
      throw new Error('Not a number');
    }
    return parsedNum;
  },
};
