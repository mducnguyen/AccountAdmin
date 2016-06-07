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
/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
var core_1 = require('@angular/core');
var auth_service_1 = require("../services/auth.service");
var user_context_1 = require("./contexts/user.context");
var abstract_storage_1 = require("../services/storage/abstract.storage");
var password_change_request_context_1 = require("./contexts/password-change-request.context");
var password_confirmation_service_1 = require("../services/password-confirmation.service");
var password_confirmation_component_1 = require("./password-confirmation.component");
var AuthComponent = (function () {
    function AuthComponent(_authService, _userContext, _storage, _passwordChangeRequestContext, _passwordConfirmation) {
        this._authService = _authService;
        this._userContext = _userContext;
        this._storage = _storage;
        this._passwordChangeRequestContext = _passwordChangeRequestContext;
        this._passwordConfirmation = _passwordConfirmation;
        this.checkForCurrentUser();
        this.loginWithCert();
        // this.requestedPasswordConfirmation = true;
        // this.requestedPasswordConfirmation = false;
    }
    AuthComponent.prototype.login = function () {
        var _this = this;
        this._authService.login(this.name, this.password).subscribe(function (user) {
            _this._userContext.setUser(user.user);
        }, function (error) {
            _this.confirmMsg = { success: false, message: error };
        });
    };
    AuthComponent.prototype.checkForCurrentUser = function () {
        var _this = this;
        var token = this._storage.getItem(auth_service_1.AUTH_TOKEN);
        if (token) {
            this._authService.getCurrentUser(token).subscribe(function (user) {
                _this._userContext.setUser(user);
            }, function (error) {
            });
        }
    };
    AuthComponent.prototype.sendChangePasswordRequest = function (username) {
        var _this = this;
        this.requestedPasswordConfirmation = true;
        this._passwordConfirmation.getConfirmationEmail(username).subscribe(function (text) {
            _this._passwordChangeRequestContext.setConfirmationText(text.text);
        });
    };
    AuthComponent.prototype.loginWithCert = function () {
        var _this = this;
        this._authService.loginWithCert().subscribe(function (user) {
            _this._userContext.setUser(user.user);
        }, function (error) {
            _this.confirmMsg = { success: false, message: error };
        });
    };
    AuthComponent = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: 'app/templates/auth.component.html',
            directives: [password_confirmation_component_1.PasswordConfirmationComponent]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_context_1.UserContext, abstract_storage_1.AbstractStorage, password_change_request_context_1.PasswordChangeRequestContext, password_confirmation_service_1.PasswordChangeService])
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map