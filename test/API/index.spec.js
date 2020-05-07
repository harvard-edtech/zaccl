import assert from 'assert';

// import zoom request stub
const stubZoomRequest = require('./helpers/stubZoomRequest');

// import class to test
const API = require('../../api');

// TODO: Fill in tests
describe('API', function () {
  describe('API > addRule', function () {
    const testAPI = new API('fakeKey', 'fakeSecret');

    it('Converts a path template to the correct regexp', function () {

    });

    it('Updates the rule map', function () {

    });

    it('Allows overwriting a rule', function () {

    });
  });

  describe('API > visitEndpoint', function () {
    it('Looks for a matching throttle rule', function () {

    });

    it('Visits the correct endpoint and method', function () {

    });

    it('Maintains a daily count per endpoint', function () {

    });

    it('Throttles per endpoint', function () {

    }); 
  });
});
