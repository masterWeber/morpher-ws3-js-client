'use strict';

class CorrectionForms {

  constructor(props) {

    if (props['И'] !== undefined) {
      this.nominative = props['И'];
      this['именительный'] = this.nominative;
    }

    if (props['Р'] !== undefined) {
      this.genitive = props['Р'];
      this['родительный'] = this.genitive;
    }

    if (props['Д'] !== undefined) {
      this.dative = props['Д'];
      this['дательный'] = this.dative;
    }

    if (props['В'] !== undefined) {
      this.accusative = props['В'];
      this['винительный'] = this.accusative;
    }

    if (props['Т'] !== undefined) {
      this.instrumental = props['Т'];
      this['творительный'] = this.instrumental;
    }

    if (props['П'] !== undefined) {
      this.prepositional = props['П'];
      this['предложный'] = this.prepositional;
    }

    if (props['М'] !== undefined) {
      this.locative = props['М'];
      this['местный'] = this.locative;
    }

  }

}

module.exports = CorrectionForms;