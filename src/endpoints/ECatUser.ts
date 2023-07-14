/**
 * Category of endpoints for Zoom users
 * @author Aryan Pandey
 * @namespace api.user
 */

// Import shared interfaces
import EndpointCategory from '../shared/interfaces/EndpointCategory';

// Import shared types
import ZoomUser from '../types/ZoomUser';

class ECatUser extends EndpointCategory {
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
  async getZAKToken(
    opts: {
      userId: string,
    },
  ): Promise<string> {
    return this.visitEndpoint({
      path: `/users/${opts.userId}/token`,
      action: 'retrieve a user\'s ZAK token',
      method: 'GET',
      params: {
        type: 'zak',
      },
      errorMap: {
        404: {
          1001: `We could not retrieve a token for Zoom user ${opts.userId} since this user does not exist`,
        },
      },
      postProcessor: (body) => {
        // extract zak token from the response object
        return body.token;
      },
    });
  }

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
  async activate(
    opts: {
      userId: string,
      dontPromoteToLicensed?: boolean,
    },
  ) {
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
  }

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
  async addWebinarLicense(
    opts: {
      userId: string,
      webinarCapacity?: (100 | 500 | 1000 | 3000 | 5000 | 10000),
    },
  ) {
    return this.visitEndpoint({
      path: `/users/${opts.userId}/settings`,
      action: 'add a webinar license to a user',
      method: 'PATCH',
      params: {
        feature: {
          webinar: true,
          webinar_capacity: (opts.webinarCapacity ?? 500),
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
  }

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
  async get(
    opts: {
      userId: string,
    },
  ): Promise<ZoomUser> {
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
  }

  /**
   * Promote a user to "licensed" type
   * @author Gabe Abrams
   * @instance
   * @memberof api.user
   * @method promoteToLicensed
   * @param opts object containing all arguments
   * @param opts.userId the user ID or email address of the user
   */
  async promoteToLicensed(
    opts: {
      userId: string,
    },
  ) {
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
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatUser;
