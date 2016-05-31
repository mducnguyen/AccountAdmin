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
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var http_1 = require('@angular/http');
var Observable_1 = require("rxjs/Observable");
/**
 * @author DucNguyenMinh
 * @since 29/05/16
 */
var EmailConfirmationService = (function () {
    function EmailConfirmationService(authHttp, http) {
        this.authHttp = authHttp;
        this.http = http;
    }
    EmailConfirmationService.prototype.getConfirmationEmail = function (user) {
        return this.authHttp.get('/api/users/' + user.name + '/email-confirm/require')
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
    EmailConfirmationService.prototype.confirmEmail = function (link) {
        return this.http.get(link)
            .map(function (res) {
            var result = res.json();
            return result;
        })
            .catch(function (err) {
            var errMsg = err.json().message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    EmailConfirmationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http])
    ], EmailConfirmationService);
    return EmailConfirmationService;
}());
exports.EmailConfirmationService = EmailConfirmationService;
//# sourceMappingURL=email-confirmation.service.js.map