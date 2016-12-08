'use strict';

/* global describe */
/* global it */

const chai = require('chai');
const expect = chai.expect;

const CountiesModel = require('../src/counties-model.js');

describe('CountiesModel', () => {
    describe('#isCounty()', () => {
        it('should return true when county is valid', () => {
            // arrange
            const model = new CountiesModel();

            // act
            const valid = model.isCounty('Lancashire');

            // assert
            expect(valid).to.be.true;
        });

        it('should return false when county is invalid', () => {
            // arrange
            const model = new CountiesModel();

            // act
            const valid = model.isCounty('Narniashire');

            // assert
            expect(valid).to.be.false;
        });
    });
});
