/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.user
 */

const EndpointCategory = require('../../EndpointCategory');

class User extends EndpointCategory {
  constructor(config) {
    super(config, User);
  }
}

/* -------------------------- Endpoints ------------------------- */

/**
 * Retrieve a user's ZAK token
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.user
 * @method getZAKToken
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 * @return {string} returns the ZAK token of the user
 */
User.getZAKToken = function (options) {
  return this.visitEndpoint({
    path: `/users/${options.userId}/token`,
    method: 'GET',
    params: {
      type: 'zak',
    },
    errorMap: {
      404: {
        1001: `We could not retrieve a token for Zoom user ${options.userId} since this user does not exist`,
      },
    },
    postProcessor: (response) => {
      // extract zak token from the response object
      const { token } = response.body;
      const newResponse = response;

      // replace body of the response with just the token
      newResponse.body = token;
      return newResponse;
    },
  });
};
User.getZAKToken.action = 'retrieve a user\'s ZAK token';
User.getZAKToken.requiredParams = ['userId'];
User.getZAKToken.scopes = [
  'user:read:admin',
  'user:read',
];

/**
 * (Re)activate a user and promote them to a "licensed" user (unless
 *   dontPromoteToLicensed is true)
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.user
 * @method activate
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 * @param {boolean} [options.dontPromoteToLicensed] - if true, the user will not
 *   be promoted to a "licensed" user just after activation
 */
User.activate = function (options) {
  // Activate the user
  const activatePromise = this.visitEndpoint({
    path: `/users/${options.userId}/status`,
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
  if (!options.dontPromoteToLicensed) {
    return activatePromise.then(() => {
      // Promote user to "licensed"
      return this.api.user.promoteToLicensed({
        userId: options.userId,
      });
    });
  }

  // Just activate and resolve
  return activatePromise;
};
User.activate.action = 'activate or reactivate a user';
User.activate.requiredParams = ['userId'];
User.activate.scopes = [
  'user:write:admin',
  'user:write',
];

/**
 * Get a user
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.user
 * @method get
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 */
User.get = function (options) {
  return this.visitEndpoint({
    path: `/users/${options.userId}`,
    method: 'GET',
    errorMap: {
      404: {
        1001: 'That Zoom user could not be found.',
      },
    },
  });
};
User.get.action = 'get a user';
User.get.requiredParams = ['userId'];
User.get.scopes = [
  'user:read:admin',
  'user:read',
];

/**
 * Promote a user to "licensed" type
 * @author Gabe Abrams
 * @async
 * @instance
 * @memberof api.user
 * @method promoteToLicensed
 * @param {object} options - object containing all arguments
 * @param {string} options.userId - the user ID or email address of the user
 */
User.promoteToLicensed = function (options) {
  return this.visitEndpoint({
    path: `/users/${options.userId}`,
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
};
User.promoteToLicensed.action = 'promote a user to "licensed" type';
User.promoteToLicensed.requiredParams = ['userId'];
User.promoteToLicensed.scopes = [
  'user:write:admin',
  'user:write',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
