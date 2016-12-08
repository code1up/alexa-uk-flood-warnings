'use strict';

/* global describe */
/* global it */

const chai = require('chai');
const expect = chai.expect;

const SlotModel = require('../src/slot-model.js');

describe('SlotModel', () => {
    describe('#value()', () => {
        it('should return slot value when slot value is set', () => {
            // arrange
            const expectedValue = 42;

            const slot = {
                value: expectedValue
            };

            const model = new SlotModel(slot); 

            // act
            const actualValue = model.value();

            // assert
            actualValue.should.equal(expectedValue);
        });

        it('should return null when slot value is not set', () => {
            // arrange
            const slot = {
            };

            const model = new SlotModel(slot); 

            // act
            const actualValue = model.value();

            // assert
            expect(actualValue).to.be.null;
        });

        it('should return null when slot is not set', () => {
            // arrange
            const model = new SlotModel(); 

            // act
            const actualValue = model.value();

            // assert
            expect(actualValue).to.be.null;
        });
    });

    describe('#understood()', () => {
        it('should be understood when slot value is set', () => {
            // arrange
            const expectedValue = 'any value';

            const slot = {
                value: expectedValue
            };

            const model = new SlotModel(slot);

            // act
            const understood = model.understood();

            // assert
            expect(understood).to.be.true;
        });

        it('should not be understood when slot value is not set', () => {
            // arrange
            const model = new SlotModel();

            // act
            const understood = model.understood();

            // assert
            expect(understood).to.be.false;
        });
    });
    
    describe('#tells()', () => {
        it('should always return no tells', () => {
            // arrange
            const model = new SlotModel(); 

            // act
            const tells = model.tells();

            // assert
            expect(tells).to.have.length(0);
        });
    });
});
