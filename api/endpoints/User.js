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
 * @param {string} userId - the user ID or email address of the user
 * @return {string} - returns the ZAK token of the user
 */
User.getZAKToken = function (options) {

  // TODO: write core function
  // TODO: Hardcode 'type' query parameter to 'zak' to always retreive zak token
  // Note: Zoom's GetToken returns an object with the token under object.token

};
User.getZAKToken.action = 'retrieve a user\'s ZAK token';
User.getZAKToken.requiredParams = ['userId'];
User.getZAKToken.scopes = [
  'user:read:admin',
  'user:read',
];
