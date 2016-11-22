'use strict';

function SpeechModel() {
}

function _toCommaSeparatedList(arr) {
    let list = '';

    arr.forEach(function (each, i) {
        var remaining = (arr.length - (i + 1));

        list += each;

        if (remaining === 0) {
            list += '.';
        } else if (remaining === 1) {
            list += ' and ';
        } else {
            list += ', ';
        }
    });

    return list;
}

SpeechModel.prototype.didNotUnderstandCounty = function () {
    return 'Looks like I don\`t know or didn\'t hear the county you said. Please try again.';
};

SpeechModel.prototype.floodWarningsInCounty = function (county, riversOrSeas) {
    if (riversOrSeas.length === 0) {
        return `There are currently no flood alerts in ${county}.`;
    }

    if (riversOrSeas.length === 1) {
        return `There is currently 1 flood alert in ${county} for the ${riversOrSeas[0]}.`;
    }

    let list = _toCommaSeparatedList(riversOrSeas);

    return [
        `There are currently ${riversOrSeas.length} flood alerts in ${county}`,
        `for the following rivers or seas: ${list}`
    ].join(' ');
};

SpeechModel.prototype.somethingWentWrong = function () {
};

module.exports = SpeechModel;
