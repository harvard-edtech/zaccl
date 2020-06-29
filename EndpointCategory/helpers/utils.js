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
   * @param {string} dateType - date type to include in error message for
   *   specificity
   * @returns {string} formatted date string
   */
  formatDate: (date, dateType) => {
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
        message: `${dateType} needs to be a JS Date instance or a string accepted by the Date constructor`,
        code: ERROR_CODES.INVALID_DATE_FORMAT,
      });
    }

    // Param can be converted to a Date instance so return formatted date
    return (
      (new Date(timestamp))
        .toISOString()
        .split('T')[0]
    );
  },

  /**
   * Returns parsed number if arg is a valid number,
   *   throws ZACCL Error otherwise
   * @author Aryan Pandey
   * @param {number} num - number that needs to be sanitized
   * @param {string} param - string to identify param
   * @returns {number} parsed number
   */
  sanitizeNum: (num, param) => {
    const parsedNum = Number(num);
    // If not a number throw a ZACCL Error
    if (Number.isNaN(parsedNum)) {
      const code = `INVALID_${param.toUpperCase()}`;
      throw new ZACCLError({
        message: `${param} is not a valid number`,
        code: ERROR_CODES[code],
      });
    }
    return parsedNum;
  },

  /**
   * Checks if param type matches desired type and
   * returns param with the correct type if possible.
   *   Throws ZACCL Error otherwise
   * @author Aryan Pandey
   * @param {string} paramName - string to identify param
   * @param {string|number|boolean|date} paramValue - value of param
   *   that needs to be converted to correct type
   * @param {string} desiredType - string to identify expected param type
   * @returns {string|number|boolean|date} value of param in the correct type
   */
  enforceParamType: (paramName, paramValue, desiredType) => {
    if (desiredType === 'string') {
      return String(paramValue);
    }

    if (desiredType === 'number') {
      return module.exports.sanitizeNum(paramValue, paramName);
    }

    if (desiredType === 'boolean') {
      return !!paramValue;
    }

    if (desiredType === 'date') {
      return module.exports.formatDate(paramValue, paramName);
    }

    throw new ZACCLError({
      message: 'We\'ve encountered an internal error while trying to handle your request. Please contact an admin.',
      code: ERROR_CODES.PROGRAMMER_ERROR,
    });
  },
};
