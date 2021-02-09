'use strict';

class DeclensionForms {

  constructor(props) {

    if (props['A'] !== undefined) {
      this.nominative = props['A'];
      this['атау'] = this.nominative;
    }

    this.genitive = props['І'];
    this['ілік'] = this.genitive;

    this.dative = props['Б'];
    this['барыс'] = this.dative;

    this.accusative = props['Т'];
    this['табыс'] = this.accusative;

    this.ablative = props['Ш'];
    this['шығыс'] = this.ablative;

    this.locative = props['Ж'];
    this['жатыс'] = this.locative;

    this.instrumental = props['К'];
    this['көмектес'] = this.instrumental;

  }

}

module.exports = DeclensionForms;