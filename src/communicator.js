'use strict';

if (!global.fetch) {
  global.fetch = require('node-fetch');
}

class Communicator {

  static METHOD_GET = 'GET';
  static METHOD_DELETE = 'DELETE';
  static METHOD_POST = 'POST';

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

  request(path, params, method) {

    const url = this.buildUrl(path, params);

    const contentType = this.isPost(method)
        ? 'application/x-www-form-urlencoded'
        : 'application/json';

    const init = {
      method: method,
      headers: {
        'Content-Type': contentType,
        'Accept': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('TIMEOUT')),
          this.timeoutMs);

      this.fetcher(url, init).then(value => {
        clearTimeout(timer);
        resolve(value);
      }).catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
    });
  }

  buildUrl(path, params) {
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

    if (global) {
      return global.fetch(url, init);
    }

    if (window) {
      return window.fetch(url, init);
    }

    return fetch(url, init);
  }

  set fetcher(fn) {
    this._fetcher = fn;
  }

  get fetcher() {
    return this._fetcher;
  }

  isPost(method) {
    return method.toUpperCase() === Communicator.METHOD_POST;
  }

}

module.exports = Communicator;