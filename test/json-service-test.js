'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
 
chai.use(chaiAsPromised);
chai.should();

const JsonService = require('../src/json-service.js')

// should fetch from URL
// should reject when request error

describe('JsonService', () => {
    describe('#get()', () => {
        it('should fetch from URL', (done) => {
            // arrange
            const expectedUrl = 'http://example.com'; 
            let actualUrl = null; 

            const options = {
                url: expectedUrl,
                fetch: url => Promise.resolve((actualUrl = url, response))
            };

            const response = {
                json: value => value
            };

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            promise.should.eventually.be.fulfilled.then(() => {
                actualUrl.should.equal(expectedUrl);
            }).should.notify(done);
        });
        
        it('should convert raw response to JSON', () => {
            // arrange
            const options = {
                fetch: () => Promise.resolve(response)
            };

            const expectedValue = 42;

            const response = {
                json: value => expectedValue
            };

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            return promise.should.eventually.equal(expectedValue);
        });

        it('should parse converted response', () => {
            // arrange
            const response = {
                json: value => initialValue
            };

            const options = {
                fetch: () => Promise.resolve(response),
                parse: value => value * 2
            };

            const initialValue = 42;
            const expectedValue = options.parse(initialValue);

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            return promise.should.eventually.equal(expectedValue);
        });

        it('should resolve response', () => {
            // arrange
            const response = {
                json: value => initialValue
            };

            const options = {
                fetch: () => Promise.resolve(response)
            };

            const initialValue = 42;
            const expectedValue = initialValue + 1;

            const resolve = value => expectedValue; 

            // act
            const service = new JsonService(options);
            const promise = service.get(resolve);

            // assert
            return promise.should.eventually.equal(expectedValue);
        });
    });
});
