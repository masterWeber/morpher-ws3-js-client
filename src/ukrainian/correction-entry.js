'use strict';

const CorrectionForms = require('./correction-forms');

class CorrectionEntry {

  constructor(props) {

    if (props['singular'] !== undefined) {
      this.singular = new CorrectionForms(props['singular']);
    }

    if (props['gender'] !== undefined) {
      this.gender = props['gender'];
    }

  }

}

module.exports = CorrectionEntry;