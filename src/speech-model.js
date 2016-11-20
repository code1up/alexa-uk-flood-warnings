'use strict';

function SpeechModel() {
}

SpeechModel.prototype.didNotUnderstandCounty = function () {
    return 'Looks like I don\`t know or didn\'t hear the county you said. Please try again.';
};

SpeechModel.prototype.floodWarningsInCounty = function (county, riversOrSeas) {
    if (riversOrSeas.length === 0) {
        return `There are currently no flood alerts in ${county}.`;
    }

    if (riversOrSeas.length === 1) {
        return `There is currently 1 flood alert in ${county} for the ${riversOrSeas[0]}`;
    }

    let text = '';

    // TODO: use _.reduce
    riversOrSeas.forEach(function (riverOrSea, i) {
        var remaining = (riversOrSeas.length - (i + 1));

        text += riverOrSea;

        if (remaining === 0) {
            // TODO: endsWith
            // text += '.';
        } else if (remaining === 1) {
            text += ' and ';
        } else {
            // TODO: more than two alerts
            // text += ', ';
        }
    });

    return [
        `There are currently ${riversOrSeas.length} flood alerts in ${county}`,
        `for the following rivers or seas: ${text}`
    ].join(' ');
};

SpeechModel.prototype.somethingWentWrong = function () {
};

module.exports = SpeechModel;
