'use strict';

const assert = require('chai').assert;
const Response = require('node-fetch').Response;
const UkrainianClient = require('../../../src/ukrainian/client');
const Morpher = require('../../../src/morpher');
const CommunicatorMock = require('../communicator-mock');
const spellResponseMock = require('../../reponse-mock/ukrainian/spell');
const MorpherError = require('../../../src/morpher-error');

describe('Ukrainian client', function() {

  describe('#declension()', async function() {

    const communicatorMock = new CommunicatorMock();

    const client = new UkrainianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      const response = {
        'Р': 'Крутько Катерини Володимирівни',
        'Д': 'Крутько Катерині Володимирівні',
        'З': 'Крутько Катерину Володимирівну',
        'О': 'Крутько Катериною Володимирівною',
        'М': 'Крутько Катерині Володимирівні',
        'К': 'Крутько Катерино Володимирівно',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      await client.declension(
          'Крутько Катерина Володимирiвна',
          Morpher.FLAG_FEMININE,
      );

      assert.equal(
          client.communicator.lastPath,
          '/ukrainian/declension',
      );
      assert.equal(
          client.communicator.lastParams.get('s'),
          'Крутько Катерина Володимирiвна',
      );
      assert.equal(
          client.communicator.lastParams.get('flags'),
          Morpher.FLAG_FEMININE,
      );
      assert.equal(
          client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET,
      );

    });

    it('should return declensions', async function() {

      const response = {
        'Р': 'Крутько Катерини Володимирівни',
        'Д': 'Крутько Катерині Володимирівні',
        'З': 'Крутько Катерину Володимирівну',
        'О': 'Крутько Катериною Володимирівною',
        'М': 'Крутько Катерині Володимирівні',
        'К': 'Крутько Катерино Володимирівно',
      };

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const declensionResult = await client.declension(
          'Крутько Катерина Володимирiвна',
      );

      assert.equal(declensionResult['родовий'], response['Р']);
      assert.equal(declensionResult['genitive'], response['Р']);

      assert.equal(declensionResult['давальний'], response['Д']);
      assert.equal(declensionResult['dative'], response['Д']);

      assert.equal(declensionResult['знахідний'], response['З']);
      assert.equal(declensionResult['accusative'], response['З']);

      assert.equal(declensionResult['орудний'], response['О']);
      assert.equal(declensionResult['instrumental'], response['О']);

      assert.equal(declensionResult['місцевий'], response['М']);
      assert.equal(declensionResult['prepositional'], response['М']);

      assert.equal(declensionResult['кличний'], response['К']);
      assert.equal(declensionResult['vocative'], response['К']);

    });

    it('should throw MorpherError', async function() {

      const response = {
        'code': 5,
        'message': 'Не найдено украинских слов.',
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

    const client = new UkrainianClient();
    client.communicator = communicatorMock;

    it('should use the correct parameters', async function() {

      communicatorMock.response = new Response(
          JSON.stringify(spellResponseMock),
          {status: 200},
      );

      await client.spell(235, 'рубль');

      assert.equal(
          client.communicator.lastPath,
          '/ukrainian/spell',
      );
      assert.equal(
          client.communicator.lastParams.get('n'),
          235,
      );
      assert.equal(
          client.communicator.lastParams.get('unit'),
          'рубль',
      );
      assert.equal(
          client.communicator.lastHttpMethod,
          CommunicatorMock.METHOD_GET,
      );

    });

    it('should return spelling number', async function() {

      const response = spellResponseMock;

      communicatorMock.response = new Response(
          JSON.stringify(response),
          {status: 200},
      );

      const numberSpellingResult = await client.spell(235, 'рубль');

      assert.equal(numberSpellingResult['n']['родовий'],
          response['n']['Р']);
      assert.equal(numberSpellingResult['n']['genitive'], response['n']['Р']);

      assert.equal(numberSpellingResult['n']['давальний'], response['n']['Д']);
      assert.equal(numberSpellingResult['n']['dative'], response['n']['Д']);

      assert.equal(numberSpellingResult['n']['знахідний'],
          response['n']['З']);
      assert.equal(numberSpellingResult['n']['accusative'], response['n']['З']);

      assert.equal(numberSpellingResult['n']['орудний'],
          response['n']['О']);
      assert.equal(numberSpellingResult['n']['instrumental'],
          response['n']['О']);

      assert.equal(numberSpellingResult['n']['місцевий'], response['n']['М']);
      assert.equal(numberSpellingResult['n']['prepositional'],
          response['n']['М']);

      assert.equal(numberSpellingResult['n']['кличний'],
          response['n']['К']);
      assert.equal(numberSpellingResult['n']['vocative'],
          response['n']['К']);

      assert.equal(numberSpellingResult['unit']['родовий'],
          response['unit']['Р']);
      assert.equal(numberSpellingResult['unit']['genitive'],
          response['unit']['Р']);

      assert.equal(numberSpellingResult['unit']['давальний'],
          response['unit']['Д']);
      assert.equal(numberSpellingResult['unit']['dative'],
          response['unit']['Д']);

      assert.equal(numberSpellingResult['unit']['знахідний'],
          response['unit']['З']);
      assert.equal(numberSpellingResult['unit']['accusative'],
          response['unit']['З']);

      assert.equal(numberSpellingResult['unit']['орудний'],
          response['unit']['О']);
      assert.equal(numberSpellingResult['unit']['instrumental'],
          response['unit']['О']);

      assert.equal(numberSpellingResult['unit']['місцевий'],
          response['unit']['М']);
      assert.equal(numberSpellingResult['unit']['prepositional'],
          response['unit']['М']);

      assert.equal(numberSpellingResult['unit']['кличний'],
          response['unit']['К']);
      assert.equal(numberSpellingResult['unit']['vocative'],
          response['unit']['К']);

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