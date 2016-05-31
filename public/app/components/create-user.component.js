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
var new_user_context_1 = require("./contexts/new-user.context");
var user_context_1 = require("./contexts/user.context");
/**
 * @author DucNguyenMinh
 * @since 28/05/16
 */
var CreateUserComponent = (function () {
    function CreateUserComponent(_userService, _newUserContext, _userContext) {
        this._userService = _userService;
        this._newUserContext = _newUserContext;
        this._userContext = _userContext;
        this.newUser = {};
    }
    CreateUserComponent.prototype.createNewUser = function () {
        var _this = this;
        this._userService.createUser(this.newUser).subscribe(function (result) {
            _this.confirmation = { success: result.success, message: "User Created!" };
            _this._newUserContext.addNewUser(_this.newUser);
        }, function (err) {
            _this.confirmation = { success: false, message: "User Existed!" };
        });
    };
    CreateUserComponent.prototype.userContext = function () {
        return this._userContext;
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'create-user',
            templateUrl: 'app/templates/create-user.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, new_user_context_1.NewUserContext, user_context_1.UserContext])
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
//# sourceMappingURL=create-user.component.js.map