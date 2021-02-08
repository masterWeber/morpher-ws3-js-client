'use strict';

const assert = require('chai').assert;
const Response = require('node-fetch').Response;
const RussianClient = require('../../src/russian/client');
const Morpher = require('../../src/morpher');
const CommunicatorMock = require('../communicator-mock');
const MorpherError = require('../../src/morpher-error');

describe('Russian client', function() {

  describe('#declension()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should be used the correct parameters', async function() {

      const response = {
        'Р': 'Любови Соколовой',
        'Д': 'Любови Соколовой',
        'В': 'Любовь Соколову',
        'Т': 'Любовью Соколовой',
        'П': 'Любови Соколовой',
        'ФИО': {
          'Ф': 'Соколова',
          'И': 'Любовь',
          'О': '',
        },
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      await client.declension(
          'Любовь Соколова',
          Morpher.FLAG_NAME,
      );

      assert.equal(client.communicator.lastPath, '/russian/declension');
      assert.equal(client.communicator.lastParams.get('s'), 'Любовь Соколова');
      assert.equal(client.communicator.lastParams.get('flags'),
          Morpher.FLAG_NAME);
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return declensions', async function() {

      const response = {
        'Р': 'теста',
        'Д': 'тесту',
        'В': 'тест',
        'Т': 'тестом',
        'П': 'тесте',
        'множественное': {
          'И': 'тесты',
          'Р': 'тестов',
          'Д': 'тестам',
          'В': 'тесты',
          'Т': 'тестами',
          'П': 'тестах',
        },
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const declensionResult = await client.declension('тест');

      assert.equal(declensionResult['родительный'], response['Р']);
      assert.equal(declensionResult['genitive'], response['Р']);

      assert.equal(declensionResult['дательный'], response['Д']);
      assert.equal(declensionResult['dative'], response['Д']);

      assert.equal(declensionResult['винительный'], response['В']);
      assert.equal(declensionResult['accusative'], response['В']);

      assert.equal(declensionResult['творительный'], response['Т']);
      assert.equal(declensionResult['instrumental'], response['Т']);

      assert.equal(declensionResult['предложный'], response['П']);
      assert.equal(declensionResult['prepositional'], response['П']);

      assert.equal(declensionResult['предложный_О'], response['П_о']);
      assert.equal(declensionResult['prepositional_O'], response['П_о']);

      assert.equal(declensionResult['множественное']['родительный'],
          response['множественное']['Р']);
      assert.equal(declensionResult['plural']['genitive'],
          response['множественное']['Р']);

      assert.equal(declensionResult['множественное']['дательный'],
          response['множественное']['Д']);
      assert.equal(declensionResult['plural']['dative'],
          response['множественное']['Д']);

      assert.equal(declensionResult['множественное']['винительный'],
          response['множественное']['В']);
      assert.equal(declensionResult['plural']['accusative'],
          response['множественное']['В']);

      assert.equal(declensionResult['множественное']['творительный'],
          response['множественное']['Т']);
      assert.equal(declensionResult['plural']['instrumental'],
          response['множественное']['Т']);

      assert.equal(declensionResult['множественное']['предложный'],
          response['множественное']['П']);
      assert.equal(declensionResult['plural']['prepositional'],
          response['множественное']['П']);

      assert.equal(declensionResult['множественное']['предложный_О'],
          response['множественное']['П_о']);
      assert.equal(declensionResult['plural']['prepositional_O'],
          response['множественное']['П_о']);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 5,
        'message': 'Не найдено русских слов.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 496},
      );

      try {
        await client.declension('test');
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

  describe('#spell()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should be used the correct parameters', async function() {

      const response = {
        'n': {
          'И': 'двести тридцать пять',
          'Р': 'двухсот тридцати пяти',
          'Д': 'двумстам тридцати пяти',
          'В': 'двести тридцать пять',
          'Т': 'двумястами тридцатью пятью',
          'П': 'двухстах тридцати пяти',
        },
        'unit': {
          'И': 'рублей',
          'Р': 'рублей',
          'Д': 'рублям',
          'В': 'рублей',
          'Т': 'рублями',
          'П': 'рублях',
        },
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      await client.spell(235, 'рубль');

      assert.equal(client.communicator.lastPath, '/russian/spell');
      assert.equal(client.communicator.lastParams.get('n'), 235);
      assert.equal(client.communicator.lastParams.get('unit'), 'рубль');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return spelling number', async function() {

      const response = {
        'n': {
          'И': 'двести тридцать пять',
          'Р': 'двухсот тридцати пяти',
          'Д': 'двумстам тридцати пяти',
          'В': 'двести тридцать пять',
          'Т': 'двумястами тридцатью пятью',
          'П': 'двухстах тридцати пяти',
        },
        'unit': {
          'И': 'рублей',
          'Р': 'рублей',
          'Д': 'рублям',
          'В': 'рублей',
          'Т': 'рублями',
          'П': 'рублях',
        },
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const declensionResult = await client.spell(235, 'рубль');

      assert.equal(declensionResult['n']['родительный'], response['n']['Р']);
      assert.equal(declensionResult['n']['genitive'], response['n']['Р']);

      assert.equal(declensionResult['n']['дательный'], response['n']['Д']);
      assert.equal(declensionResult['n']['dative'], response['n']['Д']);

      assert.equal(declensionResult['n']['винительный'], response['n']['В']);
      assert.equal(declensionResult['n']['accusative'], response['n']['В']);

      assert.equal(declensionResult['n']['творительный'], response['n']['Т']);
      assert.equal(declensionResult['n']['instrumental'], response['n']['Т']);

      assert.equal(declensionResult['n']['предложный'], response['n']['П']);
      assert.equal(declensionResult['n']['prepositional'], response['n']['П']);

      assert.equal(declensionResult['n']['предложный_О'], response['n']['П_о']);
      assert.equal(declensionResult['n']['prepositional_O'],
          response['n']['П_о']);

      assert.equal(declensionResult['unit']['родительный'],
          response['unit']['Р']);
      assert.equal(declensionResult['unit']['genitive'],
          response['unit']['Р']);

      assert.equal(declensionResult['unit']['дательный'],
          response['unit']['Д']);
      assert.equal(declensionResult['unit']['dative'],
          response['unit']['Д']);

      assert.equal(declensionResult['unit']['винительный'],
          response['unit']['В']);
      assert.equal(declensionResult['unit']['accusative'],
          response['unit']['В']);

      assert.equal(declensionResult['unit']['творительный'],
          response['unit']['Т']);
      assert.equal(declensionResult['unit']['instrumental'],
          response['unit']['Т']);

      assert.equal(declensionResult['unit']['предложный'],
          response['unit']['П']);
      assert.equal(declensionResult['unit']['prepositional'],
          response['unit']['П']);

      assert.equal(declensionResult['unit']['предложный_О'],
          response['unit']['П_о']);
      assert.equal(declensionResult['unit']['prepositional_O'],
          response['unit']['П_о']);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 6,
        'message': 'Не указан обязательный параметр: unit.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 400},
      );

      try {
        await client.spell(235);
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

});