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
var password_confirmation_service_1 = require("../services/password-confirmation.service");
var password_change_request_context_1 = require("./contexts/password-change-request.context");
/**
 * @author DucNguyenMinh
 * @since 30/05/16
 */
var PasswordConfirmationComponent = (function () {
    function PasswordConfirmationComponent(_passwordConfirmation, _passwordChangeRequestContext) {
        this._passwordConfirmation = _passwordConfirmation;
        this._passwordChangeRequestContext = _passwordChangeRequestContext;
        var that = this;
        this._passwordChangeRequestContext.listenConfirmation().subscribe(function (text) {
            that.emailText = text;
            that.confirmed = false;
            that.confirmedSuccess = false;
        });
    }
    PasswordConfirmationComponent.prototype.ngOnInit = function () {
    };
    PasswordConfirmationComponent.prototype.confirmRequest = function (link) {
        var _this = this;
        this._passwordConfirmation.confirmRequest(link).subscribe(function (result) {
            _this.confirmed = true;
            if (result.success) {
                _this.confirmedSuccess = true;
            }
            else {
                _this.confirmedSuccess = false;
            }
            _this.confirmText = result.message;
            _this.resetLink = result.resetLink;
        }, function (err) {
            _this.confirmed = true;
            _this.confirmedSuccess = false;
            _this.confirmText = err;
        });
    };
    PasswordConfirmationComponent.prototype.resetPassword = function (password) {
        var that = this;
        this._passwordConfirmation.resetPassword(this.resetLink, this.password).subscribe(function (result) {
            that.resetConfirm = { success: result.success, message: result.message };
        }, function (err) {
            that.resetConfirm = { success: false, message: err };
        });
    };
    PasswordConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'password-confirmation',
            templateUrl: 'app/templates/password-confirmation.component.html'
        }), 
        __metadata('design:paramtypes', [password_confirmation_service_1.PasswordChangeService, password_change_request_context_1.PasswordChangeRequestContext])
    ], PasswordConfirmationComponent);
    return PasswordConfirmationComponent;
}());
exports.PasswordConfirmationComponent = PasswordConfirmationComponent;
//# sourceMappingURL=password-confirmation.component.js.map