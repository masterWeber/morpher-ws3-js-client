'use strict';

class CorrectionForms {

  constructor(props) {

    if (props['Н'] !== undefined) {
      this.nominative = props['Н'];
      this['називний'] = this.nominative;
    }

    if (props['Р'] !== undefined) {
      this.genitive = props['Р'];
      this['родовий'] = this.genitive;
    }

    if (props['Д'] !== undefined) {
      this.dative = props['Д'];
      this['давальний'] = this.dative;
    }

    if (props['З'] !== undefined) {
      this.accusative = props['З'];
      this['знахідний'] = this.accusative;
    }

    if (props['О'] !== undefined) {
      this.instrumental = props['О'];
      this['орудний'] = this.instrumental;
    }

    if (props['М'] !== undefined) {
      this.prepositional = props['М'];
      this['місцевий'] = this.prepositional;
    }

    if (props['К'] !== undefined) {
      this.vocative = props['К'];
      this['кличний'] = this.vocative;
    }

  }

}

module.exports = CorrectionForms;