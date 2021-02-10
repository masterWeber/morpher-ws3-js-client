'use strict';

const Response = require('node-fetch').Response;
const Communicator = require('../../src/communicator');

class CommunicatorMock extends Communicator {

  lastPath;
  lastParams;
  lastHttpMethod;

  constructor(props) {
    super(props);
    this._response = new Response();
  }

  set response(value) {
    this._response = value;
  }

  get response() {
    return new Promise((resolve, reject) => {
      resolve(this._response);
    });
  }

  request(path, params, method) {
    this.lastPath = path;
    this.lastParams = params;
    this.lastHttpMethod = method;

    return this.response;
  }

  reset() {
    this.lastPath = undefined;
    this.lastParams = undefined;
    this.lastHttpMethod = undefined;
  }

}

module.exports = CommunicatorMock;