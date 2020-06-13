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
   * Returns formatte date string if possible,
   *   throws ZACCL Error otherwise
   * @author Aryan Pandey
   * @param {string|Date} date - date string or Date instance
   *   that needs to be validated
   * @returns {string} formatted date string
   */
  sanitizeDate: (date) => {
    // Check if string passed
    if (typeof date === 'string') {
      const re = /\d{4}-([1-9]|0[1-9]|1[012])-([1-9]|0[1-9]|[12][0-9]|3[01])$/;
      // If string is in correct format, return as is
      if (re.test(date)) {
        return date;
      }
      // Throw error if date doesn't match format
      throw new ZACCLError({
        message: 'Date needs to be in the format "yyyy-mm-dd" or a Date instance',
        code: ERROR_CODES.INVALID_DATE_FORMAT,
      });
    }

    // Check if Date instance passed
    if (typeof date.getMonth === 'function') {
      // Add 1 to month to get 1-12 scale
      const month = date.getMonth() + 1;

      // Return formatted Date string
      return `${date.getFullYear()}-${month}-${date.getDate()}`;
    }

    throw new ZACCLError({
      message: 'Date needs to be in the format "yyyy-mm-dd" or a Date instance',
      code: ERROR_CODES.INVALID_DATE_FORMAT,
    });
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
