/**
 * Set of utils for endpoints
 * @author Aryan Pandey
 * @author Gabe Abrams
 */

// Import shared types
import ErrorCode from '../types/ErrorCode';

// Import ZACCLError
import ZACCLError from '../classes/ZACCLError';

/**
 * Double encodes and returns argument string.
 *   Function assumes valid string is passed
 * @author Aryan Pandey
 * @param str string that needs to be double encoded
 * @returns processed string
 */
export const doubleEncode = (str: string): string => {
  return encodeURIComponent(encodeURIComponent(str));
};

/**
 * Returns formatted date string if possible,
 *   throws ZACCL Error otherwise
 * @author Aryan Pandey
 * @param date string accepted by JS Date constructor
 *   or instance of Date object
 * @param dateType date type to include in error message for
 *   specificity
 * @returns formatted date string
 */
export const formatDate = (date: string | Date, dateType: string): string => {
  // Check if date instance passed
  if (date instanceof Date) {
    // return formatted date string
    return (
      date
        .toISOString()
        .split('T')[0]
    );
  }

  // Check if passed parameter can be accepted by the Date constructor
  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) {
    // Param cannot be converted to a Date object so throw an error
    throw new ZACCLError({
      message: `${dateType} needs to be a JS Date instance or a string accepted by the Date constructor`,
      code: ErrorCode.InvalidDateFormat,
    });
  }

  // Param can be converted to a Date instance so return formatted date
  return (
    (new Date(timestamp))
      .toISOString()
      .split('T')[0]
  );
};

/**
 * Returns parsed number if arg is a valid number,
 *   throws ZACCL Error otherwise
 * @author Aryan Pandey
 * @param num number that needs to be sanitized
 * @param param string to identify param
 * @returns parsed number
 */
export const sanitizeNum = (num: number, param: string): number => {
  const parsedNum = Number(num);

  // If not a number throw a ZACCL Error
  if (Number.isNaN(parsedNum)) {
    throw new ZACCLError({
      message: `A request to Zoom wasn't formatted properly: ${param} should be a number.`,
      code: ErrorCode.InvalidQueryParam,
    });
  }
  return parsedNum;
};
