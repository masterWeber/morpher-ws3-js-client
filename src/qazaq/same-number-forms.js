'use strict';

const DeclensionForms = require('./declension-forms');

class SameNumberForms extends DeclensionForms {

  constructor(props) {
    super(props);

    this.firstPerson = new DeclensionForms(props['менің']);
    this['менің'] = this.firstPerson;

    this.secondPerson = new DeclensionForms(props['сенің']);
    this['сенің'] = this.secondPerson;

    this.secondPersonRespectful = new DeclensionForms(props['сіздің']);
    this['сіздің'] = this.secondPersonRespectful;

    this.thirdPerson = new DeclensionForms(props['оның']);
    this['оның'] = this.thirdPerson;

    this.firstPersonPlural = new DeclensionForms(props['біздің']);
    this['біздің'] = this.firstPersonPlural;

    this.secondPersonPlural = new DeclensionForms(props['сендердің']);
    this['сендердің'] = this.secondPersonPlural;

    this.secondPersonRespectfulPlural = new DeclensionForms(props['сіздердің']);
    this['сіздердің'] = this.secondPersonRespectfulPlural;

    this.thirdPersonPlural = new DeclensionForms(props['олардың']);
    this['олардың'] = this.thirdPersonPlural;

  }

}

module.exports = SameNumberForms;