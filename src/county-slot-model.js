const SlotModel = require('./slot-model');
const SpeechModel = require('./speech-model');
const CountiesModel = require('./counties-model');

const CountySlotModel = function (slot) {
    SlotModel.call(this, slot);
    
    this._speechModel = new SpeechModel();
    this._countiesModel = new CountiesModel();
};

CountySlotModel.prototype = Object.create(SlotModel.prototype);

CountySlotModel.prototype.understood = function () {
    const understood = 
        SlotModel.prototype.understood.call(this) &&
        this._countiesModel.isCounty(this.value());

    return understood;
};

CountySlotModel.prototype.tells = function () {
    if (this.understood()) {
        return [];
    }

    return [
        this._speechModel.didNotUnderstandCounty()
    ];
};

module.exports = CountySlotModel;
