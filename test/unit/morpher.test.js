'use strict';

const assert = require('chai').assert;
const Morpher = require('../../src/morpher');
const RussianClient = require('../../src/russian/client');
const QazaqClient = require('../../src/qazaq/client');

describe('Morpher', function() {

  describe('Setting up the Communicator', function() {

    const params = {
      baseUrl: 'localhost',
      token: 'TOKEN',
      timeoutMs: 1000,
    };

    const morpher = new Morpher(params);

    it('baseUrl is transferred to the communicator', function() {
      return assert.equal(morpher.communicator.baseUrl,
          'http://' + params.baseUrl);
    });

    it('token is transferred to the communicator', function() {
      return assert.equal(morpher.communicator.token, params.token);
    });

    it('timeoutMs is transferred to the communicator', function() {
      return assert.equal(morpher.communicator.timeoutMs, params.timeoutMs);
    });

  });

  describe('Communicator replacement', function() {

    class MockCommunicator {
    }

    const morpher = new Morpher();
    morpher.communicator = new MockCommunicator();

    it('communicator instance of MockCommunicator', function() {
      return assert.instanceOf(morpher.communicator, MockCommunicator);
    });

  });

  describe('Facade', function() {

    const morpher = new Morpher();

    it('field \'russian\' instance of RussianClient', function() {
      return assert.instanceOf(morpher.russian, RussianClient);
    });

    it('field \'qazaq\' instance of QazaqClient', function() {
      return assert.instanceOf(morpher.qazaq, QazaqClient);
    });

  });

});