'use strict';

const assert = require('chai').assert;
const Morpher = require('../../src/morpher');
const MorpherError = require('../../src/morpher-error');

describe('E2E Morpher', function() {

  describe('#getQueriesLeft()', function() {

    it('should return number', async function() {

      const morpher = new Morpher();

      const result = await morpher.getQueriesLeft();
      assert.isNumber(result);

    });

    it('should throw MorpherError', async function() {

      const morpher = new Morpher({
        token: 'XXX',
      });

      try {
        await morpher.getQueriesLeft();
      } catch (error) {
        assert.instanceOf(error, MorpherError);
      }

    });

  });

});