var BleDevice = /** @class */ (function () {
    function BleDevice(name, id) {
        this.name = name;
        this.id = id;
    }
    BleDevice.decode = function (json) {
        var user = Object.create(BleDevice.prototype);
        return Object.assign(user, json, {});
    };
    return BleDevice;
}());
//# sourceMappingURL=bledevice.js.map