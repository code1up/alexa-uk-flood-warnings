'use strict';

/*global describe */
/*global it */

const chai = require('chai');
const expect = chai.expect;

const CountySlotModel = require('../src/county-slot-model.js');
const SpeechModel = require('../src/speech-model.js');

describe('CountySlotModel', () => {
    describe('#understood()', () => {
        it('should be understood when county slot value is set', () => {
            // arrange
            const expectedValue = 'Lancashire';

            const slot = {
                value: expectedValue
            };

            const model = new CountySlotModel(slot);

            // act
            const understood = model.understood();

            // assert
            expect(understood).to.be.true;
        });

        it('should not be understood when county slot value is not set', () => {
            // arrange
            const model = new CountySlotModel();

            // act
            const understood = model.understood();

            // assert
            expect(understood).to.be.false;
        });
    });

    describe('#tells()', () => {
        it('should return no tells when county is understood', () => {
            // arrange
            const slot = {
                value: 'Yorkshire'
            };

            const model = new CountySlotModel(slot);

            // act
            const tells = model.tells();

            // assert
            expect(tells).to.have.length(0);
        });

        it('should return one tell when county is not understood', () => {
            // arrange
            const slot = {
                value: ''
            };

            const model = new CountySlotModel(slot);
            const speechModel = new SpeechModel();

            // act
            const tells = model.tells();

            // assert
            expect(tells).to.have.length(1);
            expect(tells[0]).to.be.equal(speechModel.didNotUnderstandCounty());
        });
    });
});
