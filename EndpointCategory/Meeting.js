/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.meeting
 */

const EndpointCategory = require('.');
const utils = require('./helpers/utils');

class Meeting extends EndpointCategory {
  constructor(config) {
    super(config, Meeting);
  }
}

/* -------------------------- Endpoints ------------------------- */

// TODO: add endpoints, document them, add them as static functions

Meeting.get = function (options) {
  // TODO: write core function
};
Meeting.get.action = 'get info on a meeting';
Meeting.get.requiredParams = ['meetingId'];
Meeting.get.scopes = [
  'meeting:read:admin',
  'meeting:read',
];
Meeting.get.errorMap = {
  400: {
    1010: 'the user could not be found',
    3000: 'we could not access that meeting\'s info',
  },
  404: {
    1001: 'the user could not be found',
    3001: 'that meeting could not be found or has expired',
  },
};






Meeting.create20 = function (options) {

};

