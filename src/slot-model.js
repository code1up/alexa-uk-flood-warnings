function SlotModel(slot) {
    this._slot = slot;
}

SlotModel.prototype.understood = function () {
    return false;
};

SlotModel.prototype.value = function () {
    return this._slot && this._slot.value;
};

SlotModel.prototype.tells = function () {
    return [];
};

module.exports = SlotModel;
