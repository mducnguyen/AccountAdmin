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
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var user_service_1 = require("./user.service");
var abstract_storage_1 = require("./storage/abstract.storage");
/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
var AuthService = (function () {
    function AuthService(_http, _jwtHelper, _storage, _userService) {
        this._http = _http;
        this._jwtHelper = _jwtHelper;
        this._storage = _storage;
        this._userService = _userService;
        this._authEndpoint = "/api/authenticate";
        this._authCertEndpoint = "/api/authenticate_cert";
    }
    AuthService.prototype.login = function (name, password) {
        var _this = this;
        var body = {
            name: name,
            password: password,
        };
        var options = {
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        };
        return this._http.post(this._authEndpoint, JSON.stringify(body), options)
            .flatMap(function (res) {
            if (res.status == 200) {
                var body_1 = res.json();
                var token = body_1.token;
                var jwtContent = _this._jwtHelper.decodeToken(token);
                _this.saveToken(token);
                return _this._userService.getUser(jwtContent.uri).map(function (user) {
                    return { success: true, user: user };
                });
            }
            else if (res.status == 401) {
            }
            else if (res.status == 404) {
            }
        })
            .catch(function (err) {
            var errMsg = err.json().message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    AuthService.prototype.getCurrentUser = function (token) {
        var jwtContent = this._jwtHelper.decodeToken(token);
        return this._userService.getUser(jwtContent.uri).map(function (user) {
            return user;
        });
    };
    AuthService.prototype.saveToken = function (token) {
        this._storage.setItem(exports.AUTH_TOKEN, token);
    };
    AuthService.prototype.logout = function () {
        this._storage.removeItem(exports.AUTH_TOKEN);
    };
    AuthService.prototype.loginWithCert = function () {
        var _this = this;
        return this._http.get(this._authCertEndpoint)
            .flatMap(function (res) {
            if (res.status == 200) {
                var body = res.json();
                var token = body.token;
                var jwtContent = _this._jwtHelper.decodeToken(token);
                _this.saveToken(token);
                return _this._userService.getUser(jwtContent.uri).map(function (user) {
                    return { success: true, user: user };
                });
            }
            else if (res.status == 401) {
            }
            else if (res.status == 404) {
            }
        })
            .catch(function (err) {
            var errMsg = err.json().message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.JwtHelper, abstract_storage_1.AbstractStorage, user_service_1.UserService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
exports.AUTH_TOKEN = "jwt_auth_token";
//# sourceMappingURL=auth.service.js.map