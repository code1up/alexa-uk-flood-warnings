'use strict';

const JsonService = require('./src/json-service');
const FloodAlertParser = require('./src/flood-alert-parser');
const CountySlotModel = require('./src/county-slot-model');
const SpeechModel = require('./src/speech-model');

const APP_ID = 'amzn1.ask.skill.aff3dc46-c61e-41df-9842-afd10ef2dc46';
const AlexaSkill = require('./amazon/AlexaSkill');

const UkFloodMonitorSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

const floodMonitorIntent = function (intent, session, response) {
    const countyModel = new CountySlotModel(intent.slots && intent.slots.County);

    if (!countyModel.understood()) {
        countyModel.tells().forEach(tell => {
            response.tell(tell);            
        });

        return;
    }

    const parser = new FloodAlertParser(); 

    const service = new JsonService({
        parse: parser.parse
    });

    const url = `https://environment.data.gov.uk/flood-monitoring/id/floods?county=${countyModel.value()}`;

    const speechModel = new SpeechModel();

    service
        .get(url)
        .then(riversOrSeas => {
            const warnings = speechModel.floodWarningsInCounty(countyModel.value(), riversOrSeas);

            response.tell(warnings);
        })
        .catch(() => {
            response.tell(speechModel.somethingWentWrong());
        });
};

UkFloodMonitorSkill.prototype = Object.create(AlexaSkill.prototype);
UkFloodMonitorSkill.prototype.eventHandlers.onLaunch = floodMonitorIntent;

UkFloodMonitorSkill.prototype.intentHandlers = {
    FloodMonitorIntent: floodMonitorIntent
};

exports.handler = function (event, context) {
    const service = new UkFloodMonitorSkill();

    service.execute(event, context);
};
