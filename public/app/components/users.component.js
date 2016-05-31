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
var user_service_1 = require("../services/user.service");
var user_context_1 = require("./contexts/user.context");
var create_user_component_1 = require("./create-user.component");
var new_user_context_1 = require("./contexts/new-user.context");
var email_confirmation_context_1 = require("./contexts/email-confirmation.context");
var email_confirmation_service_1 = require("../services/email-confirmation.service");
/**
 * @author DucNguyenMinh
 * @since 15/05/16
 */
var UsersComponent = (function () {
    function UsersComponent(_userService, _userContext, _newUserContext, _emailConfirmContext, _emailConfirmService) {
        var _this = this;
        this._userService = _userService;
        this._userContext = _userContext;
        this._newUserContext = _newUserContext;
        this._emailConfirmContext = _emailConfirmContext;
        this._emailConfirmService = _emailConfirmService;
        this._userService.getUsers().subscribe(function (users) { return _this.users = users; }, function (err) {
        });
        this._newUserContext.listenToNewUser().subscribe(function (user) { return _this.users.push(user); });
    }
    UsersComponent.prototype.userContext = function () {
        return this._userContext;
    };
    UsersComponent.prototype.updateEmail = function (user) {
        var _this = this;
        this._userService.adminUpdateEmail(user).subscribe(function (alert) {
            _this.confirmMsg = { success: alert.success, message: alert.message };
            user.confirmed = false;
            _this._emailConfirmService.getConfirmationEmail(user).subscribe(function (result) {
                _this._emailConfirmContext.setToBeConfirm(user);
                _this._emailConfirmContext.setConfirmationText(result.text);
            });
        }, function (err) {
            _this.confirmMsg = { success: false, message: "Update Failed" };
        });
    };
    UsersComponent.prototype.delete = function (user) {
        var _this = this;
        this._userService.delete(user).subscribe(function (alert) {
            if (alert.success) {
                _this.removeFromUsers(user);
            }
            _this.confirmMsg = { success: alert.success, message: alert.message };
        }, function (err) {
            _this.confirmMsg = { success: false, message: "Delete Failed" };
        });
    };
    UsersComponent.prototype.removeFromUsers = function (toberemoveUser) {
        var deleted = false;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].name == toberemoveUser.name) {
                this.users.splice(i, 1);
                deleted = true;
            }
        }
        return deleted;
    };
    UsersComponent.prototype.getEmailConfirmation = function (user) {
        var _this = this;
        this._emailConfirmService.getConfirmationEmail(user).subscribe(function (result) {
            _this._emailConfirmContext.setToBeConfirm(user);
            _this._emailConfirmContext.setConfirmationText(result.text);
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: 'app/templates/users.component.html',
            directives: [create_user_component_1.CreateUserComponent]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, user_context_1.UserContext, new_user_context_1.NewUserContext, email_confirmation_context_1.EmailConfirmationContext, email_confirmation_service_1.EmailConfirmationService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map