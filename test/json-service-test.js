'use strict';

/* global describe */
/* global it */

const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
 
chai.use(chaiAsPromised);
chai.should();

const JsonService = require('../src/json-service.js');

describe('JsonService', () => {
    describe('#get()', () => {
        it('should fetch from URL', (done) => {
            // arrange
            const expectedUrl = 'https://example.com'; 
            let actualUrl = null; 

            const response = {
                json: value => value
            };

            const options = {
                fetch: url => Promise.resolve((actualUrl = url, response))
            };

            // act
            const service = new JsonService(options);
            const promise = service.get(expectedUrl);

            // assert
            expect(promise).to.eventually.be.fulfilled.then(() => {
                expect(actualUrl).to.equal(expectedUrl);
            }).should.notify(done);
        });
        
        it('should convert raw response to JSON', () => {
            // arrange
            const expectedValue = 42;

            const response = {
                json: () => expectedValue
            };

            const options = {
                fetch: () => Promise.resolve(response)
            };

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            return expect(promise).to.eventually.equal(expectedValue);
        });

        it('should parse converted response', () => {
            // arrange
            const initialValue = 42;

            const response = {
                json: () => initialValue
            };

            const options = {
                fetch: () => Promise.resolve(response),
                parse: value => value * 2
            };

            const expectedValue = options.parse(initialValue);

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            return expect(promise).to.eventually.equal(expectedValue);
        });

        it('should resolve response', () => {
            // arrange
            const expectedValue = 42;

            const response = {
                json: () => expectedValue
            };

            const options = {
                fetch: () => Promise.resolve(response)
            };

            // act
            const service = new JsonService(options);
            const promise = service
                .get()
                .then(value => value);

            // assert
            return expect(promise).to.eventually.equal(expectedValue);
        });

        it('should reject when fetch fails', () => {
            // arrange
            const expectedError = new Error('Something wonderful happened.');

            const options = {
                fetch: () => {
                    throw expectedError;
                }
            };

            // act
            const service = new JsonService(options);
            const promise = service.get();

            // assert
            return expect(promise).to.be.rejectedWith(expectedError);
        });
    });
});
