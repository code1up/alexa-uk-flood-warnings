/*
'use strict';

const fetch = fetch || require('node-fetch');

const APP_ID = 'amzn1.ask.skill.XXX';
const AlexaSkill = require('../amazon/AlexaSkill');

const UkFloodAlertSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

const floodAlertsIntent = function (intent, session, response) {
    const countySlot = intent.slots.County;

    if (!countySlot) {
        response.tell('Please say the county you want to hear flood warnings for.');
        return;
    }

    const county = intent.slots.County.value;

    if (!county) {
        response.tell('Looks like I don\`t know the county you said, please try again.');
        return;
    }

    getCountyFloodWarnings(county, function (text) {
        response.tell(text);
    });
};

UkFloodAlertSkill.prototype = Object.create(AlexaSkill.prototype);
UkFloodAlertSkill.prototype.eventHandlers.onLaunch = floodAlertsIntent;

UkFloodAlertSkill.prototype.intentHandlers = {
    FloodAlertsIntent: floodAlertsIntent
};

exports.handler = function (event, context) {
    const service = new UkFloodAlertSkill();

    service.execute(event, context);
};
*/
