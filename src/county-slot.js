const SlotModel = require('./slot-model');

const CountySlot = function (slot) {
    SlotModel.call(this, slot);
};

CountySlot.prototype = Object.create(SlotModel.prototype);

CountySlot.prototype.understood = function () {
    return !!this.value();
};

CountySlot.prototype.tells = function () {
    if (!this.understood()) {
        return [
            'Looks like I don\`t know or didn\'t hear the county you said. Please try again.'
        ];
    }
};

module.exports = CountySlot;
