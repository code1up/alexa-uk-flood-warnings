'use strict';

/*global describe */
/*global it */

const chai = require('chai');
const expect = chai.expect;

const SpeechModel = require('../src/speech-model.js');

describe('SpeechModel', () => {
    describe('#didNotUnderstandCounty()', () => {
        it('should return content', () => {
            // arrange
            const model = new SpeechModel(); 

            // act
            const content = model.didNotUnderstandCounty();

            // assert
            expect(content).to.be.a('string').and.not.be.empty;
        });
    });

    describe('#floodWarningsInCounty()', () => {
        it('should return content for county when no flood warnings', () => {
            // arrange
            const model = new SpeechModel(); 
            const expectedContent = 'There are currently no flood alerts in Lancashire.';

            // act
            const content = model.floodWarningsInCounty('Lancashire', []);

            // assert
            expect(content).to.be.equal(expectedContent);
        });

        it('should return content for county when one flood warning', () => {
            // arrange
            const model = new SpeechModel();
            const expectedContent = 'There is currently 1 flood alert in Lancashire for the River Ribble.';

            const riversOrSeas = [
                'River Ribble'
            ];

            // act
            const content = model.floodWarningsInCounty('Lancashire', riversOrSeas);

            // assert
            expect(content).to.be.equal(expectedContent);
        });

        it('should return content for county when two flood warnings', () => {
            // arrange
            const model = new SpeechModel();

            const expectedContent = [
                'There are currently 2 flood alerts in Lancashire for the following',
                'rivers or seas: Bashall Brook and River Ribble.'
            ].join(' ');

            const riversOrSeas = [
                'Bashall Brook',
                'River Ribble'
            ];

            // act
            const content = model.floodWarningsInCounty('Lancashire', riversOrSeas);

            // assert
            expect(content).to.be.equal(expectedContent);
        });

        it('should return content for county when three or more flood warnings', () => {
            // arrange
            const model = new SpeechModel();

            const expectedContent = [
                'There are currently 4 flood alerts in Somerset for the following',
                'rivers or seas: Congresbury Yeo, River Alham, River Avon and Sowy River.'
            ].join(' ');

            const riversOrSeas = [
                'Congresbury Yeo',
                'River Alham',
                'River Avon',
                'Sowy River'
            ];

            // act
            const content = model.floodWarningsInCounty('Somerset', riversOrSeas);

            // assert
            expect(content).to.be.equal(expectedContent);
        });
    });

    describe('#somethingWentWrong()', () => {
        it('should return content', () => {
            // arrange
            const model = new SpeechModel(); 

            // act
            const content = model.somethingWentWrong();

            // assert
            expect(content).to.be.a('string').and.not.be.empty;
        });
    });
});
