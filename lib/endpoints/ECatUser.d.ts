/**
 * Category of endpoints for Zoom users
 * @author Aryan Pandey
 * @namespace api.user
 */
import EndpointCategory from '../shared/interfaces/EndpointCategory';
import ZoomUser from '../types/ZoomUser';
declare class ECatUser extends EndpointCategory {
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
    getZAKToken(opts: {
        userId: string;
    }): Promise<string>;
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
    activate(opts: {
        userId: string;
        dontPromoteToLicensed?: boolean;
    }): Promise<any>;
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
    addWebinarLicense(opts: {
        userId: string;
        webinarCapacity?: (100 | 500 | 1000 | 3000 | 5000 | 10000);
    }): Promise<any>;
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
    get(opts: {
        userId: string;
    }): Promise<ZoomUser>;
    /**
     * Promote a user to "licensed" type
     * @author Gabe Abrams
     * @instance
     * @memberof api.user
     * @method promoteToLicensed
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     */
    promoteToLicensed(opts: {
        userId: string;
    }): Promise<any>;
}
export default ECatUser;
