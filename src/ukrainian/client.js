'use strict';

const Communicator = require('../communicator');
const DeclensionResult = require('./declension-result');
const NumberSpellingResult = require('./number-spelling-result');
const UserDict = require('./user-dict');
const MorpherError = require('../morpher-error');

class Client {

  prefix = '/ukrainian';

  constructor(communicator) {
    this.communicator = communicator;
    this.userDict = new UserDict(communicator);
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

}

module.exports = Client;