'use strict';

if (!global.fetch) {
  global.fetch = require('node-fetch');
}

class Communicator {

  static METHOD_GET = 'GET';
  static METHOD_DELETE = 'DELETE';
  static METHOD_POST = 'POST';
  static CONTENT_BODY_KEY = 'Content-Body';

  baseUrl = 'https://ws3.morpher.ru';
  token = null;
  timeoutMs = 3000;

  constructor(params = {}) {
    if (params.baseUrl !== undefined) {

      if (params.baseUrl.indexOf('http') !== -1) {
        this.baseUrl = params.baseUrl;
      } else {
        this.baseUrl = 'http://' + params.baseUrl;
      }

    }

    if (params.token !== undefined) {
      this.token = params.token;
    }

    if (params.timeoutMs !== undefined) {
      this.timeoutMs = params.timeoutMs;
    }
  }

  request(path, params = new Map(), method = Communicator.METHOD_GET) {

    const isContentBody = this.isContentBody(params, method);

    const url = isContentBody
        ? this.buildUrl(path)
        : this.buildUrl(path, params);

    const contentType = isContentBody
        ? 'text/plain; charset=utf-8'
        : 'application/x-www-form-urlencoded';

    const init = {
      method: method,
      headers: {
        'Content-Type': contentType,
        'Accept': 'application/json',
      },
    };

    if (isContentBody) {
      init.body = params.get(Communicator.CONTENT_BODY_KEY);
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(
          () => reject(new Error('TIMEOUT')),
          this.timeoutMs,
      );

      this.fetcher(url, init).then(value => {
        clearTimeout(timer);
        resolve(value);
      }).catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
    });
  }

  buildUrl(path, params = new Map()) {
    let url = new URL(path, this.baseUrl);

    params.forEach((value, name) => {
      url.searchParams.append(name, value);
    });

    if (this.token) {
      url.searchParams.append('token', this.token);
    }

    return url.toString();
  }

  _fetcher(url, init) {
    return fetch(url, init);
  }

  set fetcher(fn) {
    this._fetcher = fn;
  }

  get fetcher() {
    return this._fetcher;
  }

  isContentBody(params, method) {
    return this.isPost(method) && params.size === 1 &&
        params.has(Communicator.CONTENT_BODY_KEY);
  }

  isPost(method) {
    return method.toUpperCase() === Communicator.METHOD_POST;
  }

}

module.exports = Communicator;