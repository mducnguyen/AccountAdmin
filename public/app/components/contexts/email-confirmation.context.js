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
var Observable_1 = require("rxjs/Observable");
/**
 * @author DucNguyenMinh
 * @since 29/05/16
 */
var EmailConfirmationContext = (function () {
    function EmailConfirmationContext() {
        this._observers = [];
    }
    EmailConfirmationContext.prototype.listenConfirmation = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this._observers.push(observer);
        });
    };
    EmailConfirmationContext.prototype.setToBeConfirm = function (user) {
        this.tobeConfirmUser = user;
    };
    EmailConfirmationContext.prototype.setConfirmationText = function (text) {
        this._observers.forEach(function (observer) {
            observer.next(text);
        });
    };
    EmailConfirmationContext = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EmailConfirmationContext);
    return EmailConfirmationContext;
}());
exports.EmailConfirmationContext = EmailConfirmationContext;
//# sourceMappingURL=email-confirmation.context.js.map