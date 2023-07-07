"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom ZACCL error class
 * @author Gabe Abrams
 */
var ZACCLError = /** @class */ (function (_super) {
    __extends(ZACCLError, _super);
    /**
     * Create a new ZACCLError
     * @author Gabe Abrams
     * @param opts object containing all arguments
     * @param [opts.message=An unknown error occurred.] error message
     * @param [opts.name=ZACCLError] name of the error
     * @param [opts.code=NOCODE1] custom error code
     * @param [opts.stack=current stack] error stack
     */
    function ZACCLError(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this) || this;
        _this.message = (_a = opts.message) !== null && _a !== void 0 ? _a : 'An unknown error occurred.';
        _this.name = (_b = opts.name) !== null && _b !== void 0 ? _b : 'ZACCLError';
        _this.code = String((_c = opts.code) !== null && _c !== void 0 ? _c : 'ZACCLNOCODE1').toUpperCase();
        _this.stack = (_d = opts.stack) !== null && _d !== void 0 ? _d : new Error(_this.message).stack;
        _this.isZACCLError = true;
        return _this;
    }
    return ZACCLError;
}(Error));
exports.default = ZACCLError;
//# sourceMappingURL=ZACCLError.js.map