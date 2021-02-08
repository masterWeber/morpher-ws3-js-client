'use strict';

const assert = require('chai').assert;
const MorpherError = require('../src/morpher-error');

describe('MorpherError', function() {

  const error = {
    code: 0,
    message: 'error message',
  };

  const morpherError = new MorpherError(error.message, error.code);

  it('set message', function() {
    return assert.equal(morpherError.message, error.message);
  });

  it('set code', function() {
    return assert.equal(morpherError.code, error.code);
  });

});