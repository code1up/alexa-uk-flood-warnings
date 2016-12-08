'use strict';

function SlotModel(slot) {
    this._slot = slot;
}

SlotModel.prototype.understood = function () {
    return !!this.value();
};

SlotModel.prototype.value = function () {
    return (this._slot && this._slot.value) || null;
};

SlotModel.prototype.tells = function () {
    return [];
};

module.exports = SlotModel;
