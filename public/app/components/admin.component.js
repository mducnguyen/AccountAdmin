/**
 * @author DucNguyenMinh
 * @since 15/05/16
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
var router_1 = require('@angular/router');
var users_component_1 = require("./users.component");
var home_component_1 = require("./home.component");
var user_context_1 = require("./contexts/user.context");
var AdminComponent = (function () {
    function AdminComponent(_router, _userContext) {
        this._router = _router;
        this._userContext = _userContext;
        this._router.navigate(['/admin/home']);
    }
    AdminComponent.prototype.userContext = function () {
        return this._userContext;
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'app/templates/admin.component.html',
            directives: [
                router_1.ROUTER_DIRECTIVES
            ]
        }),
        router_1.Routes([
            {
                path: '/users',
                component: users_component_1.UsersComponent
            },
            {
                path: '/home',
                component: home_component_1.HomeComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, user_context_1.UserContext])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map