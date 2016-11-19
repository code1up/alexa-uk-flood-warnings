'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
 
chai.use(chaiAsPromised);
chai.should();

const FloodAlertService = require('../src/flood-alert-service.js')

describe('flood-alert-service', () => {
    describe('#getFloodAlerts()', () => {
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
            const service = new FloodAlertService(options);
            const promise = service.getFloodAlerts();

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
            const service = new FloodAlertService(options);
            const promise = service.getFloodAlerts();

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
            const service = new FloodAlertService(options);
            const promise = service.getFloodAlerts(resolve);

            // assert
            return promise.should.eventually.equal(expectedValue);
        });
    });
});
