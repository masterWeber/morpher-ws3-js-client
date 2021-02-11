'use strict';

const assert = require('chai').assert;
const Communicator = require('../../src/communicator');
const fetchMock = require('fetch-mock');

describe('Communicator', function() {

  describe('Fetch replacement', function() {

    function fetcherMock(url, init) {
    }

    const communicator = new Communicator();
    communicator.fetcher = fetcherMock;

    it('fetcher equal fetcherMock', function() {
      return assert.equal(communicator.fetcher, fetcherMock);
    });

  });

  describe('#request()', function() {

    let path = '/russian/declension';

    it('should return status 200', function() {

      const communicator = new Communicator();

      let params = new Map();
      params.set('s', 'Любовь Соколова');
      params.set('flags', 'name');

      fetchMock.get(
          'https://ws3.morpher.ru/russian/declension?s=%D0%9B%D1%8E%D0%B1%D0%BE%D0%B2%D1%8C+%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0&flags=name',
          200,
      );
      return communicator.request(path, params, Communicator.METHOD_GET).
          then(result => {
            assert.equal(result.status, 200);
            fetchMock.reset();
          });
    });

    it('should return status 494', function() {

      const communicator = new Communicator();

      let params = new Map();
      params.set('s', 'Любовь Соколова');
      params.set('flags', '+++');

      fetchMock.get(
          'https://ws3.morpher.ru/russian/declension?s=%D0%9B%D1%8E%D0%B1%D0%BE%D0%B2%D1%8C+%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0&flags=%2B%2B%2B',
          494,
      );
      return communicator.request(path, params, Communicator.METHOD_GET).
          then(result => {
            assert.equal(result.status, 494);
            fetchMock.reset();
          });
    });

    it('should return error TIMEOUT', function() {

      const communicator = new Communicator({
        timeoutMs: 10,
      });

      let params = new Map();
      params.set('s', 'Любовь Соколова');

      fetchMock.get(
          'https://ws3.morpher.ru/russian/declension?s=%D0%9B%D1%8E%D0%B1%D0%BE%D0%B2%D1%8C+%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0',
          {}, {delay: 20},
      );
      return communicator.request(path, params, Communicator.METHOD_GET).
          catch(error => {
            assert.equal(error.message, 'TIMEOUT');
            fetchMock.reset();
          });
    });

  });

  describe('#buildUrl()', function() {

    let path = '/russian/declension';
    let params = new Map();
    params.set('key_1', 'value');
    params.set('key_2', 'value_1,value_2');

    it('should return correct url', function() {

      let baseUrl = 'localhost';
      let communicator = new Communicator({baseUrl});

      assert.equal(
          communicator.buildUrl(path, params),
          'http://' + baseUrl + path + '?key_1=value&key_2=value_1%2Cvalue_2',
      );

      baseUrl = 'https://secure-url';
      communicator = new Communicator({baseUrl});

      assert.equal(
          communicator.buildUrl(path, params),
          baseUrl + path + '?key_1=value&key_2=value_1%2Cvalue_2',
      );

      communicator = new Communicator();
      assert.equal(
          communicator.buildUrl(path),
          communicator.baseUrl + path,
      );
    });

  });

  describe('#isContentBody()', function() {

    const communicator = new Communicator();

    it('should return false when no parameters are specified', function() {
      return assert.equal(
          communicator.isContentBody(new Map(), Communicator.METHOD_POST),
          false,
      );
    });

    it('should return false when the \'Content-Body\' parameter is not specified',
        function() {
          const params = new Map();
          params.set('k', 0);

          return assert.equal(
              communicator.isContentBody(params, Communicator.METHOD_POST),
              false,
          );
        },
    );

    it('should return false when more than one parameter is specified',
        function() {
          const params = new Map();
          params.set('k', 0);
          params.set(Communicator.CONTENT_BODY_KEY, 'текст');

          return assert.equal(
              communicator.isContentBody(params, Communicator.METHOD_POST),
              false,
          );
        },
    );

    it('should return false when the method is not \'post\'',
        function() {
          const params = new Map();
          params.set(Communicator.CONTENT_BODY_KEY, 'текст');

          assert.equal(
              communicator.isContentBody(params, Communicator.METHOD_GET),
              false,
          );

          assert.equal(
              communicator.isContentBody(params, 'put'),
              false,
          );

          assert.equal(
              communicator.isContentBody(params, 'delete'),
              false,
          );
        },
    );

    it('should return true when the \'post\' method, the parameter is the only one, and it\'s named \'Content-Body\'',
        function() {
          const params = new Map();
          params.set(Communicator.CONTENT_BODY_KEY, 'текст');

          assert.equal(
              communicator.isContentBody(params, Communicator.METHOD_POST),
              true,
          );
        },
    );

  });

  describe('#isPost()', function() {

    const communicator = new Communicator();

    it('should return true when the value is \'post\'', function() {
      return assert.equal(communicator.isPost('post'), true);
    });

    it('should return true when the value is \'Post\'', function() {
      return assert.equal(communicator.isPost('Post'), true);
    });

    it('should return false when the value is \'get\'', function() {
      return assert.equal(communicator.isPost('get'), false);
    });

    it('should return false when the value is \'put\'', function() {
      return assert.equal(communicator.isPost('put'), false);
    });
  });

});