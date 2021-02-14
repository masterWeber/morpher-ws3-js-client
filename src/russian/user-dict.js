'use strict';

const Communicator = require('../communicator');
const CorrectionEntry = require('./correction-entry');
const MorpherError = require('../morpher-error');

class UserDict {

  path = '/russian/userdict';

  constructor(communicator) {
    this.communicator = communicator;
  }

  addOrUpdate(correctionEntry = {}) {

    const params = new Map();

    if (correctionEntry.singular !== undefined) {

      if (correctionEntry.singular.nominative !== undefined) {
        params.set('И', correctionEntry.singular.nominative);
      }

      if (correctionEntry.singular.genitive !== undefined) {
        params.set('Р', correctionEntry.singular.genitive);
      }

      if (correctionEntry.singular.dative !== undefined) {
        params.set('Д', correctionEntry.singular.dative);
      }

      if (correctionEntry.singular.accusative !== undefined) {
        params.set('В', correctionEntry.singular.accusative);
      }

      if (correctionEntry.singular.instrumental !== undefined) {
        params.set('Т', correctionEntry.singular.instrumental);
      }

      if (correctionEntry.singular.prepositional !== undefined) {
        params.set('П', correctionEntry.singular.prepositional);
      }

      if (correctionEntry.singular.locative !== undefined) {
        params.set('М', correctionEntry.singular.locative);
      }
    }

    if (correctionEntry.plural !== undefined) {

      if (correctionEntry.plural.nominative !== undefined) {
        params.set('М_И', correctionEntry.plural.nominative);
      }

      if (correctionEntry.plural.genitive !== undefined) {
        params.set('М_Р', correctionEntry.plural.genitive);
      }

      if (correctionEntry.plural.dative !== undefined) {
        params.set('М_Д', correctionEntry.plural.dative);
      }

      if (correctionEntry.plural.accusative !== undefined) {
        params.set('М_В', correctionEntry.plural.accusative);
      }

      if (correctionEntry.plural.instrumental !== undefined) {
        params.set('М_Т', correctionEntry.plural.instrumental);
      }

      if (correctionEntry.plural.prepositional !== undefined) {
        params.set('М_П', correctionEntry.plural.prepositional);
      }

      if (correctionEntry.plural.locative !== undefined) {
        params.set('М_М', correctionEntry.plural.locative);
      }
    }

    return this.communicator.request(
        this.path,
        params,
        Communicator.METHOD_POST,
    ).
        then(response => response.text()).
        then(text => {

          // In the case of a successful request the service returns nothing,
          // and in the case of an error in the specified format.
          if (text === '') {
            return true;
          }

          let data = {};

          try {
            data = JSON.parse(text);
          } catch (e) {
            throw new Error(e.message);
          }

          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

        });
  }

  getAll() {
    return this.communicator.request(
        this.path,
        new Map(),
        Communicator.METHOD_GET,
    ).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return data.map(e => new CorrectionEntry(e));
        });
  }

  remove(nominativeForm = '') {
    const params = new Map();
    params.set('s', nominativeForm);

    return this.communicator.request(
        this.path,
        params,
        Communicator.METHOD_DELETE,
    ).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return data;
        });
  }

}

module.exports = UserDict;