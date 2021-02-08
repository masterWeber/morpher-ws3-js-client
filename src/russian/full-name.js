'use strict';

class FullName {
  constructor(props) {
    this.name = props['И'];
    this['имя'] = this.name;

    this.surname = props['Ф'];
    this['фамилия'] = this.surname;

    this.patronymic = props['О'];
    this['отчество'] = this.patronymic;
  }
}

module.exports = FullName;