'use strict';

const DeclensionForms = require('./declension-forms');
const FullName = require('./full-name');

class DeclensionResult extends DeclensionForms {

  constructor(props) {
    super(props);

    if (props['род'] !== undefined) {
      this.gender = props['род'];
      this['род'] = this.gender;
    }

    if (props['множественное'] !== undefined) {
      this.plural = new DeclensionForms(props['множественное']);
      this['множественное'] = this['plural'];
    }

    if (props['где'] !== undefined) {
      this.where = props['где'];
      this.locative = this.where;
      this.gde = this.where;
      this['где'] = this.where;
    }

    if (props['куда'] !== undefined) {
      this.where_to = props['куда'];
      this.kuda = this.where_to;
      this['куда'] = this.where_to;
    }

    if (props['откуда'] !== undefined) {
      this.where_from = props['откуда'];
      this.whence = this.where_from;
      this.otkuda = this.where_from;
      this['откуда'] = this.where_from;
    }

    if (props['ФИО'] !== undefined) {
      this.fullName = new FullName(props['ФИО']);
      this['фио'] = this.fullName;
    }
  }

}

module.exports = DeclensionResult;