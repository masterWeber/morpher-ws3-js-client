'use strict';

const assert = require('chai').assert;
const Communicator = require('../src/communicator');

describe('Communicator', function () {

    describe('Fetch replacement', function () {

        function fetcherMock(url, init) {
        }

        const communicator = new Communicator();
        communicator.fetcher = fetcherMock;

        it('fetcher equal fetcherMock', function () {
            return assert.equal(communicator.fetcher, fetcherMock);
        });

    });

    describe('#buildUrl()', function () {

        const baseUrl = 'localhost';
        let path = '/russian/declension';
        let params = new Map();
        params.set('key_1', 'value');
        params.set('key_2', 'value_1,value_2');

        const communicator = new Communicator({
            baseUrl,
        });

        it('should return correct url', function () {
            return assert.equal(
                communicator.buildUrl(path, params),
                'http://localhost/russian/declension?key_1=value&key_2=value_1%2Cvalue_2'
            );
        });

    });

    describe('#isPost()', function () {
        const communicator = new Communicator();

        it("should return true when the value is 'post'", function () {
            return assert.equal(communicator.isPost('post'), true);
        });

        it("should return true when the value is 'Post'", function () {
            return assert.equal(communicator.isPost('Post'), true);
        });

        it("should return false when the value is 'get'", function () {
            return assert.equal(communicator.isPost('get'), false);
        });

        it("should return false when the value is 'put'", function () {
            return assert.equal(communicator.isPost('put'), false);
        });
    });

});