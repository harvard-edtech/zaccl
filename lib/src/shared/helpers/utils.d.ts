/**
 * Set of utils for endpoints
 * @author Aryan Pandey
 * @author Gabe Abrams
 */
/**
 * Double encodes and returns argument string.
 *   Function assumes valid string is passed
 * @author Aryan Pandey
 * @param str string that needs to be double encoded
 * @returns processed string
 */
export declare const doubleEncode: (str: string) => string;
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
export declare const formatDate: (date: string | Date, dateType: string) => string;
/**
 * Returns parsed number if arg is a valid number,
 *   throws ZACCL Error otherwise
 * @author Aryan Pandey
 * @param num number that needs to be sanitized
 * @param param string to identify param
 * @returns parsed number
 */
export declare const sanitizeNum: (num: number, param: string) => number;
