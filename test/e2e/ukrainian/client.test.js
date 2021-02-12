'use strict';

const assert = require('chai').assert;
const Morpher = require('../../../src/morpher');
const MorpherError = require('../../../src/morpher-error');

describe('E2E Ukrainian client', function() {

  const morpher = new Morpher();

  describe('#declension()', function() {

    it('should return valid ResultDeclension', async function() {
      const result = await morpher.ukrainian.declension(
          'Крутько Катерина Володимирiвна',
          Morpher.FLAG_FEMININE,
      );

      assert.equal(result.genitive, 'Крутько Катерини Володимирівни');
      assert.equal(result.dative, 'Крутько Катерині Володимирівні');
      assert.equal(result.accusative, 'Крутько Катерину Володимирівну');
      assert.equal(result.instrumental, 'Крутько Катериною Володимирівною');
      assert.equal(result.prepositional, 'Крутько Катерині Володимирівні');
      assert.equal(result.vocative, 'Крутько Катерино Володимирівно');

    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.ukrainian.declension('+++');
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

  describe('#spell()', function() {

    it('should return valid NumberSpellingResult', async function() {

      const result = await morpher.ukrainian.spell(200, 'копейка');

      assert.equal(result.n.nominative, 'двісті');
      assert.equal(result.n.genitive, 'двохсот');
      assert.equal(result.n.dative, 'двомстам');
      assert.equal(result.n.accusative, 'двісті');
      assert.equal(result.n.instrumental, 'двомастами');
      assert.equal(result.n.prepositional, 'двохстах');
      assert.equal(result.n.vocative, 'двісті');

      assert.equal(result.unit.nominative, 'копейок');
      assert.equal(result.unit.genitive, 'копейок');
      assert.equal(result.unit.dative, 'копейкам');
      assert.equal(result.unit.accusative, 'копейок');
      assert.equal(result.unit.instrumental, 'копейками');
      assert.equal(result.unit.prepositional, 'копейках');
      assert.equal(result.unit.vocative, 'копейок');

    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.ukrainian.spell(200);
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

});