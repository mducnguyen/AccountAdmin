"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_storage_1 = require("./abstract.storage");
/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */
var DelegateStorage = (function (_super) {
    __extends(DelegateStorage, _super);
    /**
     * @param _nativeStorage browser's native implementation
     */
    function DelegateStorage(_nativeStorage) {
        _super.call(this);
        this._nativeStorage = _nativeStorage;
    }
    DelegateStorage.prototype.clear = function () {
        this._nativeStorage.clear();
    };
    DelegateStorage.prototype.getItem = function (key) {
        return this._nativeStorage.getItem(key);
    };
    DelegateStorage.prototype.key = function (index) {
        return this._nativeStorage[index];
    };
    DelegateStorage.prototype.removeItem = function (key) {
        this._nativeStorage.removeItem(key);
    };
    DelegateStorage.prototype.setItem = function (key, data) {
        this._nativeStorage.setItem(key, data);
    };
    return DelegateStorage;
}(abstract_storage_1.AbstractStorage));
exports.DelegateStorage = DelegateStorage;
//# sourceMappingURL=delegate.storage.js.map