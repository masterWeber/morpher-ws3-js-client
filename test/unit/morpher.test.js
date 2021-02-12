'use strict';

const assert = require('chai').assert;
const Morpher = require('../../src/morpher');
const RussianClient = require('../../src/russian/client');
const UkrainianClient = require('../../src/ukrainian/client');
const QazaqClient = require('../../src/qazaq/client');
const CommunicatorMock = require('./communicator-mock');
const MorpherError = require('../../src/morpher-error');
const Response = require('node-fetch').Response;

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

    it('field \'ukrainian\' instance of UkrainianClient', function() {
      return assert.instanceOf(morpher.ukrainian, UkrainianClient);
    });

    it('field \'qazaq\' instance of QazaqClient', function() {
      return assert.instanceOf(morpher.qazaq, QazaqClient);
    });

  });

  describe('#getQueriesLeft()', function() {

    const communicatorMock = new CommunicatorMock();

    const morpher = new Morpher();
    morpher.communicator = communicatorMock;

    it('should return number', async function() {

      const response = 99;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const result = await morpher.getQueriesLeft();

      assert.equal(result, response);
    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 10,
        'message': 'Неверный формат токена.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 497},
      );

      communicatorMock.token = 'XXX';

      try {
        await morpher.getQueriesLeft();
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

});