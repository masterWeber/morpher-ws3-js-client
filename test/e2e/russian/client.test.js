'use strict';

const assert = require('chai').assert;
const Morpher = require('../../../src/morpher');
const MorpherError = require('../../../src/morpher-error');

describe('E2E Russian client', function() {

  const morpher = new Morpher();

  describe('#declension()', function() {

    it('should return valid ResultDeclension', async function() {
      const result = await morpher.russian.declension(
          'Тест',
          Morpher.FLAG_COMMON,
      );

      assert.equal(result.genitive, 'Теста');
      assert.equal(result.dative, 'Тесту');
      assert.equal(result.accusative, 'Тест');
      assert.equal(result.instrumental, 'Тестом');
      assert.equal(result.prepositional, 'Тесте');

      assert.equal(result.plural.nominative, 'Тесты');
      assert.equal(result.plural.genitive, 'Тестов');
      assert.equal(result.plural.dative, 'Тестам');
      assert.equal(result.plural.accusative, 'Тесты');
      assert.equal(result.plural.instrumental, 'Тестами');
      assert.equal(result.plural.prepositional, 'Тестах');
    });

    it('should return valid ResultDeclension with fullName', async function() {
      const result = await morpher.russian.declension(
          'Пушкин Александр Сергеевич',
      );

      assert.equal(result.genitive, 'Пушкина Александра Сергеевича');
      assert.equal(result.dative, 'Пушкину Александру Сергеевичу');
      assert.equal(result.accusative, 'Пушкина Александра Сергеевича');
      assert.equal(result.instrumental, 'Пушкиным Александром Сергеевичем');
      assert.equal(result.prepositional, 'Пушкине Александре Сергеевиче');

      assert.equal(result.fullName.surname, 'Пушкин');
      assert.equal(result.fullName.name, 'Александр');
      assert.equal(result.fullName.patronymic, 'Сергеевич');
    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.russian.declension('+++');
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

  describe('#spell()', function() {

    it('should return valid NumberSpellingResult', async function() {
      const result = await morpher.russian.spell(200, 'копейка');

      assert.equal(result.n.nominative, 'двести');
      assert.equal(result.n.genitive, 'двухсот');
      assert.equal(result.n.dative, 'двумстам');
      assert.equal(result.n.accusative, 'двести');
      assert.equal(result.n.instrumental, 'двумястами');
      assert.equal(result.n.prepositional, 'двухстах');

      assert.equal(result.unit.nominative, 'копеек');
      assert.equal(result.unit.genitive, 'копеек');
      assert.equal(result.unit.dative, 'копейкам');
      assert.equal(result.unit.accusative, 'копеек');
      assert.equal(result.unit.instrumental, 'копейками');
      assert.equal(result.unit.prepositional, 'копейках');
    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.russian.spell(200);
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

  describe('#spellOrdinal()', function() {

    it('should return valid NumberSpellingResult', async function() {
      const result = await morpher.russian.spellOrdinal(200, 'копейка');

      assert.equal(result.n.nominative, 'двухсотая');
      assert.equal(result.n.genitive, 'двухсотой');
      assert.equal(result.n.dative, 'двухсотой');
      assert.equal(result.n.accusative, 'двухсотую');
      assert.equal(result.n.instrumental, 'двухсотой');
      assert.equal(result.n.prepositional, 'двухсотой');

      assert.equal(result.unit.nominative, 'копейка');
      assert.equal(result.unit.genitive, 'копейки');
      assert.equal(result.unit.dative, 'копейке');
      assert.equal(result.unit.accusative, 'копейку');
      assert.equal(result.unit.instrumental, 'копейкой');
      assert.equal(result.unit.prepositional, 'копейке');
    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.russian.spellOrdinal(200);
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });
});