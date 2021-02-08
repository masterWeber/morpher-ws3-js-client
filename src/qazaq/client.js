'use strict';

const Communicator = require('../communicator');
const DeclensionResult = require('./declension-result');
const MorpherError = require('../morpher-error');

class Client {

  prefix = '/qazaq';

  constructor(communicator) {
    this.communicator = communicator;
  }

  declension(phrase) {
    const params = new Map();
    params.set('s', phrase);

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
}

module.exports = Client;