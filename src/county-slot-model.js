const SlotModel = require('./slot-model');
const SpeechModel = require('./speech-model');

const CountySlotModel = function (slot) {
    SlotModel.call(this, slot);
    
    this._speechModel = new SpeechModel();
};

CountySlotModel.prototype = Object.create(SlotModel.prototype);

/*
CountySlotModel.prototype.understood = function () {
    // TODO: move simplest case to SlotModel
    return !!this.value();
};
*/

CountySlotModel.prototype.tells = function () {
    if (this.understood()) {
        return [];
    }

    return [
        this._speechModel.didNotUnderstandCounty()
    ];
};

module.exports = CountySlotModel;
