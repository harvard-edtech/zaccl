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
 * Retreive a user's ZAK token
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.user
 * @method getZAKToken
 * @param {string} userId - the user ID or email address of the user
 * @return {object} - returns object with the ZAK token found under object.token
 */
User.getZAKToken = function (options) {

  // TODO: write core function
  // TODO: Hardcode 'type' query parameter to 'zak' to always retreive zak token

};
User.getZAKToken.action = 'retreive a user\'s ZAK token';
User.getZAKToken.requiredParams = ['userId'];
User.getZAKToken.scopes = [
  'user:read:admin',
  'user:read',
];
