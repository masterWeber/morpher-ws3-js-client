'use strict';

class AdjectiveGenders {
  constructor(props) {
    this.feminine = props['feminine'];
    this['женский'] = this.feminine;

    this.neuter = props['neuter'];
    this['средний'] = this.neuter;

    this.plural = props['plural'];
    this['множественное'] = this.plural;
  }
}

module.exports = AdjectiveGenders;