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
var email_confirmation_service_1 = require("../services/email-confirmation.service");
var email_confirmation_context_1 = require("./contexts/email-confirmation.context");
/**
 * @author DucNguyenMinh
 * @since 23/05/16
 */
var EmailConfirmationComponent = (function () {
    function EmailConfirmationComponent(_emailConfirmService, _emailConfirmContext) {
        var _this = this;
        this._emailConfirmService = _emailConfirmService;
        this._emailConfirmContext = _emailConfirmContext;
        this._emailConfirmContext.listenConfirmation().subscribe(function (text) {
            _this.emailText = text;
            _this.confirmed = false;
            _this.confirmedSuccess = false;
        });
    }
    EmailConfirmationComponent.prototype.getTobeConfirmUser = function () {
        return this._emailConfirmContext.tobeConfirmUser;
    };
    EmailConfirmationComponent.prototype.emailConfirmContext = function () {
        return this._emailConfirmContext;
    };
    EmailConfirmationComponent.prototype.confirmEmail = function () {
        var _this = this;
        this._emailConfirmService.confirmEmail(this.emailText).subscribe(function (result) {
            _this.confirmed = true;
            if (result.success) {
                _this.confirmedSuccess = true;
                _this._emailConfirmContext.tobeConfirmUser.confirmed = true;
            }
            else {
                _this.confirmedSuccess = false;
            }
            _this.confirmText = result.message;
        }, function (err) {
            _this.confirmed = true;
            _this.confirmedSuccess = false;
            _this.confirmText = err;
        });
    };
    EmailConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'email-confirmation',
            templateUrl: 'app/templates/email-confirmation.component.html'
        }), 
        __metadata('design:paramtypes', [email_confirmation_service_1.EmailConfirmationService, email_confirmation_context_1.EmailConfirmationContext])
    ], EmailConfirmationComponent);
    return EmailConfirmationComponent;
}());
exports.EmailConfirmationComponent = EmailConfirmationComponent;
//# sourceMappingURL=email-confirmation.component.js.map