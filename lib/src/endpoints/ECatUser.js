"use strict";
/**
 * Category of endpoints for Zoom users
 * @author Aryan Pandey
 * @namespace api.user
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared interfaces
const EndpointCategory_1 = __importDefault(require("../shared/interfaces/EndpointCategory"));
class ECatUser extends EndpointCategory_1.default {
    /**
     * Retrieve a user's ZAK token (Light)
     * @author Aryan Pandey
     * @instance
     * @memberof api.user
     * @method getZAKToken
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @returns the ZAK token of the user
     */
    getZAKToken(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/users/${opts.userId}/token`,
                action: 'retrieve a user\'s ZAK token',
                method: 'GET',
                params: {
                    type: 'zak',
                },
                itemKey: 'token',
                errorMap: {
                    404: {
                        1001: `We could not retrieve a token for Zoom user ${opts.userId} since this user does not exist`,
                    },
                },
            });
        });
    }
    /**
     * (Re)activate a user and promote them to a "licensed" user (unless
     *   dontPromoteToLicensed is true) (Light)
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method activate
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param [opts.dontPromoteToLicensed] - if true, the user will not
     *   be promoted to a "licensed" user just after activation
     */
    activate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Activate the user
            const activatePromise = this.visitEndpoint({
                path: `/users/${opts.userId}/status`,
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
                return activatePromise.then(() => {
                    // Promote user to "licensed"
                    return this.api.user.promoteToLicensed({
                        userId: opts.userId,
                    });
                });
            }
            // Just activate and resolve
            return activatePromise;
        });
    }
    /**
     * Add a webinar license to the user of interest (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method addWebinarLicense
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param [opts.webinarCapacity=500] the max capacity for this
     *   user's webinars. Allowed values: 100, 500, 1000, 3000, 5000, 10000
     */
    addWebinarLicense(opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/users/${opts.userId}/settings`,
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
            });
        });
    }
    /**
     * Get a user (Light)
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method get
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @returns Zoom user object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/user}
     */
    get(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/users/${opts.userId}`,
                action: 'get a user',
                method: 'GET',
                errorMap: {
                    404: {
                        1001: 'That Zoom user could not be found.',
                    },
                },
            });
        });
    }
    /**
     * Promote a user to "licensed" type (Light)
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method promoteToLicensed
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     */
    promoteToLicensed(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitEndpoint({
                path: `/users/${opts.userId}`,
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
            });
        });
    }
}
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatUser;
//# sourceMappingURL=ECatUser.js.map