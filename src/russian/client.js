'use strict';

const Communicator = require('../communicator');
const DeclensionResult = require('./declension-result');
const NumberSpellingResult = require('./number-spelling-result');
const DateSpellingResult = require('./date-spelling-result');
const AdjectiveGenders = require('./adjective-genders');
const MorpherError = require('../morpher-error');

class Client {

  prefix = '/russian';

  constructor(communicator) {
    this.communicator = communicator;
  }

  declension(phrase = '', ...flags) {
    const params = new Map();
    params.set('s', phrase);

    if (flags.length > 0) {
      params.set('flags', flags.join(','));
    }

    const path = this.prefix + '/declension';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return new DeclensionResult(data);
        });
  }

  spell(number = 0, unit = '') {
    const params = new Map();
    params.set('n', number);
    params.set('unit', unit);

    const path = this.prefix + '/spell';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return new NumberSpellingResult(data);
        });
  }

  spellOrdinal(number = 0, unit = '') {
    const params = new Map();
    params.set('n', number);
    params.set('unit', unit);

    const path = this.prefix + '/spell-ordinal';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return new NumberSpellingResult(data);
        });
  }

  spellDate(date = '') {
    const params = new Map();
    params.set('date', date);

    const path = this.prefix + '/spell-date';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return new DateSpellingResult(data);
        });
  }

  adjectiveGenders(lemma = '') {
    const params = new Map();
    params.set('s', lemma);

    const path = this.prefix + '/genders';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return new AdjectiveGenders(data);
        });
  }

  adjectivize(lemma = '') {
    const params = new Map();
    params.set('s', lemma);

    const path = this.prefix + '/adjectivize';

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return data;
        });
  }

  addStressMarks(text = '') {
    const params = new Map();
    params.set(Communicator.CONTENT_BODY_KEY, text);

    const path = this.prefix + '/addstressmarks';

    return this.communicator.request(path, params, Communicator.METHOD_POST).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return data;
        });
  }

}

module.exports = Client;