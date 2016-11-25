'use strict';

/* global describe */
/* global it */

const fs = require('fs');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
 
chai.use(chaiAsPromised);
chai.should();

const FloodAlertParser = require('../src/flood-alert-parser.js');

describe('FloodAlertParser', () => {
    describe('#parse()', () => {
        it('should parse no flood alerts', () => {
            // arrange
            const json = fs.readFileSync('./test/data/no-flood-alerts.json');
            const response = JSON.parse(json); 

            // act
            const parser = new FloodAlertParser();
            const alerts = parser.parse(response);

            // assert
            alerts.should.have.length(0);
        });

        it('should parse one flood alert for one river or sea', () => {
            // arrange
            const json = fs.readFileSync('./test/data/one-flood-alert-one-river-or-sea.json');
            const response = JSON.parse(json);

            const expectedRiverOrSea = [
                'North Sea'
            ];

            // act
            const parser = new FloodAlertParser();
            const alerts = parser.parse(response);

            // assert
            alerts.should.deep.equal(expectedRiverOrSea);
        });

        it('should parse one flood alert for multiple rivers or seas', () => {
            // arrange
            const json = fs.readFileSync('./test/data/one-flood-alert-multiple-rivers-or-seas.json');
            const response = JSON.parse(json);

            const expectedRiverOrSea = [
                'Eden',
                'Eden Brook'
            ];

            // act
            const parser = new FloodAlertParser();
            const alerts = parser.parse(response);

            // assert
            alerts.should.deep.equal(expectedRiverOrSea);
        });

        it('should parse multiple flood alerts for multiple duplicate rivers or seas', () => {
            // arrange
            const json = fs.readFileSync('./test/data/multiple-flood-alerts-multiple-duplicate-rivers-or-seas.json');
            const response = JSON.parse(json);

            const expectedRiverOrSea = [
                'Cheddar Yeo',
                'Chew Stoke Stream',
                'Congresbury Yeo',
                'Doniford Stream',
                'Halsewater Stream',
                'Hawkcombe Stream',
                'Hillfarrance Brook',
                'Horner Water',
                'Monksilver Stream',
                'River Aller',
                'River Axe',
                'River Banwell',
                'River Barle',
                'River Bray',
                'River Cam',
                'River Chew',
                'River Exe',
                'River Lyn',
                'River Mole',
                'River Tone',
                'River Wriggle',
                'River Yeo',
                'Washford River',
                'Winford Brook'
            ];

            // act
            const parser = new FloodAlertParser();
            const alerts = parser.parse(response);

            // assert
            alerts.should.deep.equal(expectedRiverOrSea);
        });
    });
});
