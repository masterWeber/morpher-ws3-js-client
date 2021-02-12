'use strict';

class DeclensionForms {

  constructor(props) {
    if (props['Н'] !== undefined) {
      this.nominative = props['Н'];
      this['називний'] = this.nominative;
    }

    this.genitive = props['Р'];
    this['родовий'] = this.genitive;

    this.dative = props['Д'];
    this['давальний'] = this.dative;

    this.accusative = props['З'];
    this['знахідний'] = this.accusative;

    this.instrumental = props['О'];
    this['орудний'] = this.instrumental;

    this.prepositional = props['М'];
    this['місцевий'] = this.prepositional;

    this.vocative = props['К'];
    this['кличний'] = this.vocative;

  }

}

module.exports = DeclensionForms;