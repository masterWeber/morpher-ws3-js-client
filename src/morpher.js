'use strict';

const Communicator = require('./communicator');
const RussianClient = require('./russian/client');
const QazaqClient = require('./qazaq/client');
const MorpherError = require('./morpher-error');

class Morpher {

  static FLAG_FEMININE = 'feminine';
  static FLAG_MASCULINE = 'masculine';
  static FLAG_ANIMATE = 'animate';
  static FLAG_INANIMATE = 'inanimate';
  static FLAG_COMMON = 'common';
  static FLAG_NAME = 'name';
  static FLAG_NEUTER = 'neuter';
  static FLAG_PLURAL = 'plural';

  constructor(params) {
    this.communicator = new Communicator(params);
  }

  set communicator(value) {
    this._communicator = value;
  }

  get communicator() {
    return this._communicator;
  }

  get russian() {
    return new RussianClient(this.communicator);
  }

  get qazaq() {
    return new QazaqClient(this.communicator);
  }

  getQueriesLeft() {
    const path = '/get-queries-left';
    const params = new Map();

    return this.communicator.request(path, params, Communicator.METHOD_GET).
        then(response => response.json()).
        then(data => {
          if (data['message'] && data['code']) {
            throw new MorpherError(data['message'], data['code']);
          }

          return data;
        });
  }

}

module.exports = Morpher;