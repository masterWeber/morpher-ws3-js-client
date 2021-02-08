'use strict';

const SameNumberForms = require('./same-number-forms');

class DeclensionResult extends SameNumberForms {

  constructor(props) {
    super(props);

    this.plural = new SameNumberForms(props['көпше']);
    this['көпше'] = this.plural;
  }

}

module.exports = DeclensionResult;