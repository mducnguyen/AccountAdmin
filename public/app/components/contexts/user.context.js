"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
/**
 * @author DucNguyenMinh
 * @since 14/05/16
 */
var UserContext = (function () {
    function UserContext() {
    }
    UserContext.prototype.setUser = function (user) {
        this._currentUser = user;
    };
    UserContext.prototype.getCurrentUser = function () {
        return this._currentUser;
    };
    UserContext.prototype.isLoggedIn = function () {
        return this._currentUser != null;
    };
    UserContext.prototype.isAdmin = function () {
        return this._currentUser.admin;
    };
    UserContext = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserContext);
    return UserContext;
}());
exports.UserContext = UserContext;
//# sourceMappingURL=user.context.js.map