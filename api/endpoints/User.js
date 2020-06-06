/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.user
 */

const EndpointCategory = require('../../EndpointCategory');
const utils = require('../../EndpointCategory/helpers/utils');

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
 * @return {string} - returns the ZAK token of the user
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
        1001: `User ${options.userId} does not exist`,
      },
    },
    postProcessor: (response) => {
      // return just the zak token from the response object
      return response.body.token;
    },
  });
};
User.getZAKToken.action = 'retrieve a user\'s ZAK token';
User.getZAKToken.requiredParams = ['userId'];
User.getZAKToken.scopes = [
  'user:read:admin',
  'user:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
