"use strict";
/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.user
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared interfaces
var EndpointCategory_1 = __importDefault(require("../shared/interfaces/EndpointCategory"));
var ECatUser = /** @class */ (function (_super) {
    __extends(ECatUser, _super);
    function ECatUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieve a user's ZAK token
     * @author Aryan Pandey
     * @instance
     * @memberof api.user
     * @method getZAKToken
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @returns the ZAK token of the user
     */
    ECatUser.prototype.getZAKToken = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId, "/token"),
                        action: 'retrieve a user\'s ZAK token',
                        method: 'GET',
                        params: {
                            type: 'zak',
                        },
                        errorMap: {
                            404: {
                                1001: "We could not retrieve a token for Zoom user ".concat(opts.userId, " since this user does not exist"),
                            },
                        },
                        postProcessor: function (response) {
                            // extract zak token from the response object
                            var token = response.body.token;
                            var newResponse = response;
                            // replace body of the response with just the token
                            newResponse.body = token;
                            return newResponse;
                        },
                    })];
            });
        });
    };
    /**
     * (Re)activate a user and promote them to a "licensed" user (unless
     *   dontPromoteToLicensed is true)
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method activate
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param [opts.dontPromoteToLicensed] - if true, the user will not
     *   be promoted to a "licensed" user just after activation
     */
    ECatUser.prototype.activate = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var activatePromise;
            var _this = this;
            return __generator(this, function (_a) {
                activatePromise = this.visitEndpoint({
                    path: "/users/".concat(opts.userId, "/status"),
                    action: 'activate or reactivate a user',
                    method: 'PUT',
                    params: {
                        action: 'activate',
                    },
                    errorMap: {
                        400: {
                            200: 'That Zoom user could not be activated.',
                            3412: 'The Zoom account has reached its max allowed active accounts.',
                            2033: 'The Zoom account reached its basic user limit.',
                        },
                        404: {
                            1001: 'That Zoom user could not be found.',
                        },
                    },
                });
                // Optionally promote to "licensed"
                if (!opts.dontPromoteToLicensed) {
                    return [2 /*return*/, activatePromise.then(function () {
                            // Promote user to "licensed"
                            return _this.api.user.promoteToLicensed({
                                userId: opts.userId,
                            });
                        })];
                }
                // Just activate and resolve
                return [2 /*return*/, activatePromise];
            });
        });
    };
    /**
     * Add a webinar license to the user of interest
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method addWebinarLicense
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param [opts.webinarCapacity=500] the max capacity for this
     *   user's webinars. Allowed values: 100, 500, 1000, 3000, 5000, 10000
     */
    ECatUser.prototype.addWebinarLicense = function (opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId, "/settings"),
                        action: 'add a webinar license to a user',
                        method: 'PATCH',
                        params: {
                            feature: {
                                webinar: true,
                                webinar_capacity: ((_a = opts.webinarCapacity) !== null && _a !== void 0 ? _a : 500),
                            },
                        },
                        errorMap: {
                            400: {
                                1122: 'Webinar feature can only be enabled for Licensed or On-prem users.',
                            },
                            404: {
                                1001: 'That Zoom user could not be found.',
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Get a user
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method get
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @returns Zoom user object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/user}
     */
    ECatUser.prototype.get = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId),
                        action: 'get a user',
                        method: 'GET',
                        errorMap: {
                            404: {
                                1001: 'That Zoom user could not be found.',
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Promote a user to "licensed" type
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method promoteToLicensed
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     */
    ECatUser.prototype.promoteToLicensed = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId),
                        action: 'promote a user to "licensed" type',
                        method: 'PATCH',
                        params: {
                            type: 2, // Licensed
                        },
                        errorMap: {
                            400: {
                                2034: 'The Zoom account has reached its max allowed active accounts.',
                                2033: 'The Zoom account reached its basic user limit.',
                            },
                            404: {
                                1001: 'That Zoom user could not be found.',
                            },
                        },
                    })];
            });
        });
    };
    return ECatUser;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatUser;
//# sourceMappingURL=ECatUser.js.map