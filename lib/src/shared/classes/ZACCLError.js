"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom ZACCL error class
 * @author Gabe Abrams
 */
class ZACCLError extends Error {
    /**
     * Create a new ZACCLError
     * @author Gabe Abrams
     * @param opts object containing all arguments
     * @param [opts.message=An unknown error occurred.] error message
     * @param [opts.name=ZACCLError] name of the error
     * @param [opts.code=NOCODE1] custom error code
     * @param [opts.stack=current stack] error stack
     */
    constructor(opts = {}) {
        var _a, _b, _c, _d;
        super();
        this.message = (_a = opts.message) !== null && _a !== void 0 ? _a : 'An unknown error occurred.';
        this.name = (_b = opts.name) !== null && _b !== void 0 ? _b : 'ZACCLError';
        this.code = String((_c = opts.code) !== null && _c !== void 0 ? _c : 'ZACCLNOCODE1').toUpperCase();
        this.stack = (_d = opts.stack) !== null && _d !== void 0 ? _d : new Error(this.message).stack;
        this.isZACCLError = true;
    }
}
exports.default = ZACCLError;
//# sourceMappingURL=ZACCLError.js.map