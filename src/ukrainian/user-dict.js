'use strict';

const Communicator = require('../communicator');
const CorrectionEntry = require('./correction-entry');
const MorpherError = require('../morpher-error');

class UserDict {

  path = '/ukrainian/userdict';

  constructor(communicator) {
    this.communicator = communicator;
  }

  addOrUpdate(correctionEntry = {}) {

    const params = new Map();

    if (correctionEntry.singular !== undefined) {

      if (correctionEntry.singular.nominative !== undefined) {
        params.set('Н', correctionEntry.singular.nominative);
      }

      if (correctionEntry.singular.genitive !== undefined) {
        params.set('Р', correctionEntry.singular.genitive);
      }

      if (correctionEntry.singular.dative !== undefined) {
        params.set('Д', correctionEntry.singular.dative);
      }

      if (correctionEntry.singular.accusative !== undefined) {
        params.set('З', correctionEntry.singular.accusative);
      }

      if (correctionEntry.singular.instrumental !== undefined) {
        params.set('О', correctionEntry.singular.instrumental);
      }

      if (correctionEntry.singular.prepositional !== undefined) {
        params.set('М', correctionEntry.singular.prepositional);
      }

      if (correctionEntry.singular.vocative !== undefined) {
        params.set('К', correctionEntry.singular.vocative);
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