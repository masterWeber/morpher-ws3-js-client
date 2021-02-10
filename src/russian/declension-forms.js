'use strict';

class DeclensionForms {

  constructor(props) {
    if (props['И'] !== undefined) {
      this.nominative = props['И'];
      this['именительный'] = this.nominative;
    }

    this.genitive = props['Р'];
    this['родительный'] = this.genitive;

    this.dative = props['Д'];
    this['дательный'] = this.dative;

    this.accusative = props['В'];
    this['винительный'] = this.accusative;

    this.instrumental = props['Т'];
    this['творительный'] = this.instrumental;

    this.prepositional = props['П'];
    this['предложный'] = this.prepositional;

    if (props['П_о'] !== undefined) {
      this.prepositional_O = props['П_о'];
      this['предложный_О'] = this.prepositional_O;
    }
  }

}

module.exports = DeclensionForms;