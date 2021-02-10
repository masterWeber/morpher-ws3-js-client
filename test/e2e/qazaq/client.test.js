'use strict';

const assert = require('chai').assert;
const Morpher = require('../../../src/morpher');
const MorpherError = require('../../../src/morpher-error');

describe('E2E Qazaq client', function() {

  const morpher = new Morpher();

  describe('#declension()', function() {

    it('should return valid ResultDeclension', async function() {
      const result = await morpher.qazaq.declension(
          'Нұрсултан Әбішұлы Назарбаев'
      );

      assert.equal(result.genitive, 'Нұрсултан Әбішұлы Назарбаевтың');
      assert.equal(result.dative, 'Нұрсултан Әбішұлы Назарбаевқа');
      assert.equal(result.accusative, 'Нұрсултан Әбішұлы Назарбаевты');
      assert.equal(result.ablative, 'Нұрсултан Әбішұлы Назарбаевтан');
      assert.equal(result.locative, 'Нұрсултан Әбішұлы Назарбаевта');
      assert.equal(result.instrumental, 'Нұрсултан Әбішұлы Назарбаевпен');

      assert.equal(result.plural.nominative, 'Нұрсултан Әбішұлы Назарбаевтар');
      assert.equal(result.plural.genitive, 'Нұрсултан Әбішұлы Назарбаевтардың');
      assert.equal(result.plural.dative, 'Нұрсултан Әбішұлы Назарбаевтарға');
      assert.equal(result.plural.accusative, 'Нұрсултан Әбішұлы Назарбаевтарды');
      assert.equal(result.plural.ablative, 'Нұрсултан Әбішұлы Назарбаевтардан');
      assert.equal(result.plural.locative, 'Нұрсултан Әбішұлы Назарбаевтарда');
      assert.equal(result.plural.instrumental, 'Нұрсултан Әбішұлы Назарбаевтармен');
    });

    it('should throw MorpherError', async function() {

      try {
        await morpher.russian.declension('+++');
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

});