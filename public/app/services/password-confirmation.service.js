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
var Observable_1 = require("rxjs/Observable");
/**
 * @author DucNguyenMinh
 * @since 30/05/16
 */
var PasswordChangeService = (function () {
    function PasswordChangeService(_http) {
        this._http = _http;
    }
    PasswordChangeService.prototype.getConfirmationEmail = function (username) {
        return this._http.get('/api/users/' + username + '/new_password_confirmation')
            .map(function (res) {
            var result = res.json();
            if (result.success) {
                return { text: result.text };
            }
            else {
                return { text: "No email was found! Please request new Email!" };
            }
        })
            .catch(function (err) {
            var errMsg = err.message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    PasswordChangeService.prototype.confirmRequest = function (link) {
        return this._http.get(link)
            .map(function (res) {
            var result = res.json();
            return result;
        })
            .catch(function (err) {
            var errMsg = err.json().message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    PasswordChangeService.prototype.resetPassword = function (link, password) {
        var options = {
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        };
        return this._http.post(link, JSON.stringify({ password: password }), options)
            .map(function (res) {
            var result = res.json();
            return result;
        })
            .catch(function (err) {
            var errMsg = err.json().message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    PasswordChangeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PasswordChangeService);
    return PasswordChangeService;
}());
exports.PasswordChangeService = PasswordChangeService;
//# sourceMappingURL=password-confirmation.service.js.map