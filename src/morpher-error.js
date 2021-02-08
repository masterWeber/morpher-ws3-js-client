'use strict';

class MorpherError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = MorpherError;