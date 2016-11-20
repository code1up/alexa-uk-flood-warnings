'use strict';

/*global describe */
/*global it */

const chai = require('chai');
const should = chai.should();

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
            should.not.exist(actualValue);
        });

        it('should return null when slot is not set', () => {
            // arrange
            const model = new SlotModel(); 

            // act
            const actualValue = model.value();

            // assert
            should.not.exist(actualValue);
        });

        it('should always return no tells', () => {
            // arrange
            const model = new SlotModel(); 

            // act
            const tells = model.tells();

            // assert
            tells.should.have.length(0);
        });
    });
});
