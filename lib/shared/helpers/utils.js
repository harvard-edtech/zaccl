"use strict";
/**
 * Set of utils for endpoints
 * @author Aryan Pandey
 * @author Gabe Abrams
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeNum = exports.formatDate = exports.doubleEncode = void 0;
// Import shared types
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
// Import ZACCLError
var ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
/**
 * Double encodes and returns argument string.
 *   Function assumes valid string is passed
 * @author Aryan Pandey
 * @param str string that needs to be double encoded
 * @returns processed string
 */
var doubleEncode = function (str) {
    return encodeURIComponent(encodeURIComponent(str));
};
exports.doubleEncode = doubleEncode;
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
var formatDate = function (date, dateType) {
    // Check if date instance passed
    if (date instanceof Date) {
        // return formatted date string
        return (date
            .toISOString()
            .split('T')[0]);
    }
    // Check if passed parameter can be accepted by the Date constructor
    var timestamp = Date.parse(date);
    if (Number.isNaN(timestamp)) {
        // Param cannot be converted to a Date object so throw an error
        throw new ZACCLError_1.default({
            message: "".concat(dateType, " needs to be a JS Date instance or a string accepted by the Date constructor"),
            code: ErrorCode_1.default.InvalidDateFormat,
        });
    }
    // Param can be converted to a Date instance so return formatted date
    return ((new Date(timestamp))
        .toISOString()
        .split('T')[0]);
};
exports.formatDate = formatDate;
/**
 * Returns parsed number if arg is a valid number,
 *   throws ZACCL Error otherwise
 * @author Aryan Pandey
 * @param num number that needs to be sanitized
 * @param param string to identify param
 * @returns parsed number
 */
var sanitizeNum = function (num, param) {
    var parsedNum = Number(num);
    // If not a number throw a ZACCL Error
    if (Number.isNaN(parsedNum)) {
        throw new ZACCLError_1.default({
            message: "A request to Zoom wasn't formatted properly: ".concat(param, " should be a number."),
            code: ErrorCode_1.default.InvalidQueryParam,
        });
    }
    return parsedNum;
};
exports.sanitizeNum = sanitizeNum;
//# sourceMappingURL=utils.js.map