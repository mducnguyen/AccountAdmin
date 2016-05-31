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
var user_context_1 = require("./contexts/user.context");
var user_service_1 = require("../services/user.service");
var email_confirmation_service_1 = require("../services/email-confirmation.service");
var email_confirmation_context_1 = require("./contexts/email-confirmation.context");
/**
 * @author DucNguyenMinh
 * @since 23/05/16
 */
var UserComponent = (function () {
    function UserComponent(_userContext, _userService, _emailConfirmContext, _emailConfirmService) {
        var _this = this;
        this._userContext = _userContext;
        this._userService = _userService;
        this._emailConfirmContext = _emailConfirmContext;
        this._emailConfirmService = _emailConfirmService;
        this.user = this._userContext.getCurrentUser();
        this._userService.getUser(this._userContext.getCurrentUser().id).subscribe(function (user) { return _this.user = user; });
    }
    UserComponent.prototype.userContext = function () {
        return this._userContext;
    };
    UserComponent.prototype.saveInfo = function () {
        var _this = this;
        this._userService.updateEmail(this.user).subscribe(function (alert) {
            _this.confirmMsg = { success: alert.success, message: alert.message };
            _this.user.confirmed = false;
            _this._emailConfirmService.getConfirmationEmail(_this.user).subscribe(function (result) {
                _this._emailConfirmContext.setToBeConfirm(_this.user);
                _this._emailConfirmContext.setConfirmationText(result.text);
            });
        }, function (err) { _this.confirmMsg = { success: false, message: "Update Failed" }; });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user',
            templateUrl: 'app/templates/user.component.html'
        }), 
        __metadata('design:paramtypes', [user_context_1.UserContext, user_service_1.UserService, email_confirmation_context_1.EmailConfirmationContext, email_confirmation_service_1.EmailConfirmationService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map