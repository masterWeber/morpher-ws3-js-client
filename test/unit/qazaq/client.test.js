'use strict';

const assert = require('chai').assert;
const Response = require('node-fetch').Response;
const QazaqClient = require('../../../src/qazaq/client');
const CommunicatorMock = require('../communicator-mock');
const MorpherError = require('../../../src/morpher-error');
const declensionResponseMock = require('../../reponse-mock/qazaq/declension');

describe('Qazaq client', function() {

  describe('#declension()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new QazaqClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(declensionResponseMock),
          {status: 200},
      );

      await client.declension('Нұрсултан Әбішұлы Назарбаев');

      assert.equal(client.communicator.lastPath, '/qazaq/declension');
      assert.equal(client.communicator.lastParams.get('s'),
          'Нұрсултан Әбішұлы Назарбаев');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return declensions', async function() {

      const response = declensionResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const declensionResult = await client.declension('Нұрсултан Әбішұлы Назарбаев');

      assert.equal(declensionResult['ілік'], response['І']);
      assert.equal(declensionResult['genitive'], response['І']);

      assert.equal(declensionResult['барыс'], response['Б']);
      assert.equal(declensionResult['dative'], response['Б']);

      assert.equal(declensionResult['табыс'], response['Т']);
      assert.equal(declensionResult['accusative'], response['Т']);

      assert.equal(declensionResult['шығыс'], response['Ш']);
      assert.equal(declensionResult['ablative'], response['Ш']);

      assert.equal(declensionResult['жатыс'], response['Ж']);
      assert.equal(declensionResult['locative'], response['Ж']);

      assert.equal(declensionResult['көмектес'], response['К']);
      assert.equal(declensionResult['instrumental'], response['К']);


      assert.equal(declensionResult['көпше']['атау'], response['көпше']['A']);
      assert.equal(declensionResult['plural']['nominative'], response['көпше']['A']);

      assert.equal(declensionResult['көпше']['ілік'], response['көпше']['І']);
      assert.equal(declensionResult['plural']['genitive'], response['көпше']['І']);

      assert.equal(declensionResult['көпше']['барыс'], response['көпше']['Б']);
      assert.equal(declensionResult['plural']['dative'], response['көпше']['Б']);

      assert.equal(declensionResult['көпше']['табыс'], response['көпше']['Т']);
      assert.equal(declensionResult['plural']['accusative'], response['көпше']['Т']);

      assert.equal(declensionResult['көпше']['шығыс'], response['көпше']['Ш']);
      assert.equal(declensionResult['plural']['ablative'], response['көпше']['Ш']);

      assert.equal(declensionResult['көпше']['жатыс'], response['көпше']['Ж']);
      assert.equal(declensionResult['plural']['locative'], response['көпше']['Ж']);

      assert.equal(declensionResult['көпше']['көмектес'], response['көпше']['К']);
      assert.equal(declensionResult['plural']['instrumental'], response['көпше']['К']);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 6,
        'message': 'Не указан обязательный параметр: s.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 496},
      );

      try {
        await client.declension('+++');
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

});