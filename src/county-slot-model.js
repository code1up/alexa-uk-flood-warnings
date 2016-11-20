const SlotModel = require('./slot-model');

const CountySlotModel = function (slot) {
    SlotModel.call(this, slot);
};

CountySlotModel.prototype = Object.create(SlotModel.prototype);

CountySlotModel.prototype.understood = function () {
    return !!this.value();
};

CountySlotModel.prototype.tells = function () {
    if (this.understood()) {
        return [];
    }

    return [
        'Looks like I don\`t know or didn\'t hear the county you said. Please try again.'
    ];
};

module.exports = CountySlotModel;
