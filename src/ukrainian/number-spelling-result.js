'use strict';

const DeclensionForms = require('./declension-forms');

class NumberSpellingResult {
  constructor(props) {
    this.n = new DeclensionForms(props['n']);
    this.unit = new DeclensionForms(props['unit']);
  }
}

module.exports = NumberSpellingResult;