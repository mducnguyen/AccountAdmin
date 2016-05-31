/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var auth_component_1 = require("./auth.component");
var auth_service_1 = require("../services/auth.service");
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var abstract_storage_1 = require("../services/storage/abstract.storage");
var delegate_storage_1 = require("../services/storage/delegate.storage");
var user_service_1 = require("../services/user.service");
var user_context_1 = require("./contexts/user.context");
var admin_component_1 = require("./admin.component");
var home_component_1 = require("./home.component");
var users_component_1 = require("./users.component");
var user_component_1 = require("./user.component");
var email_confirmation_component_1 = require("./email-confirmation.component");
var new_user_context_1 = require("./contexts/new-user.context");
var email_confirmation_context_1 = require("./contexts/email-confirmation.context");
var email_confirmation_service_1 = require("../services/email-confirmation.service");
var password_change_request_context_1 = require("./contexts/password-change-request.context");
var password_confirmation_service_1 = require("../services/password-confirmation.service");
var authProvider = core_1.provide(angular2_jwt_1.AuthHttp, {
    useFactory: function (http, storage) {
        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
            headerName: "x-access-token",
            headerPrefix: " ",
            tokenName: auth_service_1.AUTH_TOKEN,
            tokenGetter: function () { return storage.getItem(auth_service_1.AUTH_TOKEN); },
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }), http);
    },
    deps: [http_1.Http, abstract_storage_1.AbstractStorage]
});
var storageProvider = core_1.provide(abstract_storage_1.AbstractStorage, {
    useFactory: function () { return new delegate_storage_1.DelegateStorage(localStorage); }
});
var AppComponent = (function () {
    function AppComponent(_authService, _userContext, _router) {
        this._authService = _authService;
        this._userContext = _userContext;
        this._router = _router;
        if (this._userContext.isLoggedIn()) {
            this._router.navigate(['/home']);
        }
    }
    AppComponent.prototype.userContext = function () {
        return this._userContext;
    };
    AppComponent.prototype.logout = function () {
        this._userContext.setUser(null);
        this._authService.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/templates/app.component.html',
            directives: [auth_component_1.AuthComponent, admin_component_1.AdminComponent, email_confirmation_component_1.EmailConfirmationComponent, router_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService, http_1.HTTP_PROVIDERS, angular2_jwt_1.JwtHelper, authProvider, storageProvider,
                user_service_1.UserService, user_context_1.UserContext, router_1.ROUTER_PROVIDERS, new_user_context_1.NewUserContext, email_confirmation_context_1.EmailConfirmationContext, email_confirmation_service_1.EmailConfirmationService,
                password_confirmation_service_1.PasswordChangeService, password_change_request_context_1.PasswordChangeRequestContext]
        }),
        router_1.Routes([
            { path: '/home', component: home_component_1.HomeComponent },
            { path: '/users', component: users_component_1.UsersComponent },
            { path: '/user/setting', component: user_component_1.UserComponent },
            { path: '*', component: home_component_1.HomeComponent }
        ]), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_context_1.UserContext, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map