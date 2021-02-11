'use strict';

const assert = require('chai').assert;
const Response = require('node-fetch').Response;
const RussianClient = require('../../../src/russian/client');
const Morpher = require('../../../src/morpher');
const CommunicatorMock = require('../communicator-mock');
const spellResponseMock = require('../../reponse-mock/russian/spell');
const spellOrdinalResponseMock = require('../../reponse-mock/russian/spell-ordinal');
const spellDateResponseMock = require('../../reponse-mock/russian/spell-date');
const adjectiveGendersResponseMock = require('../../reponse-mock/russian/adjective-genders');
const MorpherError = require('../../../src/morpher-error');

describe('Russian client', function() {

  describe('#declension()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

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

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(spellResponseMock),
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

      const response = spellResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const numberSpellingResult = await client.spell(235, 'рубль');

      assert.equal(numberSpellingResult['n']['родительный'], response['n']['Р']);
      assert.equal(numberSpellingResult['n']['genitive'], response['n']['Р']);

      assert.equal(numberSpellingResult['n']['дательный'], response['n']['Д']);
      assert.equal(numberSpellingResult['n']['dative'], response['n']['Д']);

      assert.equal(numberSpellingResult['n']['винительный'], response['n']['В']);
      assert.equal(numberSpellingResult['n']['accusative'], response['n']['В']);

      assert.equal(numberSpellingResult['n']['творительный'], response['n']['Т']);
      assert.equal(numberSpellingResult['n']['instrumental'], response['n']['Т']);

      assert.equal(numberSpellingResult['n']['предложный'], response['n']['П']);
      assert.equal(numberSpellingResult['n']['prepositional'], response['n']['П']);

      assert.equal(numberSpellingResult['n']['предложный_О'], response['n']['П_о']);
      assert.equal(numberSpellingResult['n']['prepositional_O'],
          response['n']['П_о']);

      assert.equal(numberSpellingResult['unit']['родительный'],
          response['unit']['Р']);
      assert.equal(numberSpellingResult['unit']['genitive'],
          response['unit']['Р']);

      assert.equal(numberSpellingResult['unit']['дательный'],
          response['unit']['Д']);
      assert.equal(numberSpellingResult['unit']['dative'],
          response['unit']['Д']);

      assert.equal(numberSpellingResult['unit']['винительный'],
          response['unit']['В']);
      assert.equal(numberSpellingResult['unit']['accusative'],
          response['unit']['В']);

      assert.equal(numberSpellingResult['unit']['творительный'],
          response['unit']['Т']);
      assert.equal(numberSpellingResult['unit']['instrumental'],
          response['unit']['Т']);

      assert.equal(numberSpellingResult['unit']['предложный'],
          response['unit']['П']);
      assert.equal(numberSpellingResult['unit']['prepositional'],
          response['unit']['П']);

      assert.equal(numberSpellingResult['unit']['предложный_О'],
          response['unit']['П_о']);
      assert.equal(numberSpellingResult['unit']['prepositional_O'],
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

  describe('#spellOrdinal()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(spellOrdinalResponseMock),
          {status: 200},
      );

      await client.spellOrdinal(5, 'колесо');

      assert.equal(client.communicator.lastPath, '/russian/spell-ordinal');
      assert.equal(client.communicator.lastParams.get('n'), 5);
      assert.equal(client.communicator.lastParams.get('unit'), 'колесо');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return spelling number as ordinal number', async function() {

      const response = spellOrdinalResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const numberSpellingResult = await client.spellOrdinal(5, 'колесо');

      assert.equal(numberSpellingResult['n']['родительный'], response['n']['Р']);
      assert.equal(numberSpellingResult['n']['genitive'], response['n']['Р']);

      assert.equal(numberSpellingResult['n']['дательный'], response['n']['Д']);
      assert.equal(numberSpellingResult['n']['dative'], response['n']['Д']);

      assert.equal(numberSpellingResult['n']['винительный'], response['n']['В']);
      assert.equal(numberSpellingResult['n']['accusative'], response['n']['В']);

      assert.equal(numberSpellingResult['n']['творительный'], response['n']['Т']);
      assert.equal(numberSpellingResult['n']['instrumental'], response['n']['Т']);

      assert.equal(numberSpellingResult['n']['предложный'], response['n']['П']);
      assert.equal(numberSpellingResult['n']['prepositional'], response['n']['П']);

      assert.equal(numberSpellingResult['n']['предложный_О'], response['n']['П_о']);
      assert.equal(numberSpellingResult['n']['prepositional_O'],
          response['n']['П_о']);

      assert.equal(numberSpellingResult['unit']['родительный'],
          response['unit']['Р']);
      assert.equal(numberSpellingResult['unit']['genitive'],
          response['unit']['Р']);

      assert.equal(numberSpellingResult['unit']['дательный'],
          response['unit']['Д']);
      assert.equal(numberSpellingResult['unit']['dative'],
          response['unit']['Д']);

      assert.equal(numberSpellingResult['unit']['винительный'],
          response['unit']['В']);
      assert.equal(numberSpellingResult['unit']['accusative'],
          response['unit']['В']);

      assert.equal(numberSpellingResult['unit']['творительный'],
          response['unit']['Т']);
      assert.equal(numberSpellingResult['unit']['instrumental'],
          response['unit']['Т']);

      assert.equal(numberSpellingResult['unit']['предложный'],
          response['unit']['П']);
      assert.equal(numberSpellingResult['unit']['prepositional'],
          response['unit']['П']);

      assert.equal(numberSpellingResult['unit']['предложный_О'],
          response['unit']['П_о']);
      assert.equal(numberSpellingResult['unit']['prepositional_O'],
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
        await client.spellOrdinal(5);
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

  describe('#spellDate()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(spellDateResponseMock),
          {status: 200},
      );

      await client.spellDate('2021-01-01');

      assert.equal(client.communicator.lastPath, '/russian/spell-date');
      assert.equal(client.communicator.lastParams.get('date'), '2021-01-01');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return date spelling', async function() {

      const response = spellDateResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const dateSpellingResult = await client.spellDate('2021-01-01');

      assert.equal(dateSpellingResult['родительный'], response['Р']);
      assert.equal(dateSpellingResult['genitive'], response['Р']);

      assert.equal(dateSpellingResult['дательный'], response['Д']);
      assert.equal(dateSpellingResult['dative'], response['Д']);

      assert.equal(dateSpellingResult['винительный'], response['В']);
      assert.equal(dateSpellingResult['accusative'], response['В']);

      assert.equal(dateSpellingResult['творительный'], response['Т']);
      assert.equal(dateSpellingResult['instrumental'], response['Т']);

      assert.equal(dateSpellingResult['предложный'], response['П']);
      assert.equal(dateSpellingResult['prepositional'], response['П']);

    });

    it('should throw MorpherError', async function() {

      let response = {
        'code': 6,
        'message': 'Не указан обязательный параметр: date.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 400},
      );

      try {
        await client.spellDate();
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

      response = {
        'code': 8,
        'message': 'Дата указана в некорректном формате.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 499},
      );

      try {
        await client.spellDate('01.01.2020');
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

  describe('#adjectiveGenders()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(adjectiveGendersResponseMock),
          {status: 200},
      );

      await client.adjectiveGenders('уважаемый');

      assert.equal(client.communicator.lastPath, '/russian/genders');
      assert.equal(client.communicator.lastParams.get('s'), 'уважаемый');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return the transformed adjective', async function() {

      const response = adjectiveGendersResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const adjectiveGenders = await client.adjectiveGenders('уважаемый');

      assert.equal(adjectiveGenders['женский'], response['feminine']);
      assert.equal(adjectiveGenders['feminine'], response['feminine']);

      assert.equal(adjectiveGenders['средний'], response['neuter']);
      assert.equal(adjectiveGenders['neuter'], response['neuter']);

      assert.equal(adjectiveGenders['множественное'], response['plural']);
      assert.equal(adjectiveGenders['plural'], response['plural']);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 6,
        'message': 'Не указан обязательный параметр: s.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 400},
      );

      try {
        await client.adjectiveGenders();
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

  describe('#adjectivize()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new RussianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(['ростовский']),
          {status: 200},
      );

      await client.adjectivize('Ростов');

      assert.equal(client.communicator.lastPath, '/russian/adjectivize');
      assert.equal(client.communicator.lastParams.get('s'), 'Ростов');
      assert.equal(client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET);

    });

    it('should return an adjective formed from the name of a city or country', async function() {

      const response = ['ростовский'];

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const result = await client.adjectivize('Ростов');

      assert.deepEqual(result, response);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 6,
        'message': 'Не указан обязательный параметр: s.',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 400},
      );

      try {
        await client.adjectivize();
      } catch (err) {
        assert.instanceOf(err, MorpherError);
      }

    });

  });

});