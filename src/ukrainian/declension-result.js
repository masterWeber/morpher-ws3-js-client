'use strict';

const DeclensionForms = require('./declension-forms');

class DeclensionResult extends DeclensionForms {

  constructor(props) {
    super(props);

    if (props['рід'] !== undefined) {
      this.gender = props['рід'];
      this['рід'] = this.gender;
    }
  }

}

module.exports = DeclensionResult;