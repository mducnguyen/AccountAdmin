/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

import {Component, provide} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS, Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {AUTH_TOKEN, AuthService} from "../services/auth.service";
import {AuthHttp, JwtHelper, AuthConfig} from "angular2-jwt/angular2-jwt";
import {AbstractStorage} from "../services/storage/abstract.storage";
import {DelegateStorage} from "../services/storage/delegate.storage";
import {UserService} from "../services/user.service";
import {UserContext} from "./contexts/user.context";
import {AdminComponent} from "./admin.component";
import {HomeComponent} from "./home.component";
import {UsersComponent} from "./users.component";
import {UserComponent} from "./user.component";
import {EmailConfirmationComponent} from "./email-confirmation.component";
import {NewUserContext} from "./contexts/new-user.context";
import {EmailConfirmationContext} from "./contexts/email-confirmation.context";
import {EmailConfirmationService} from "../services/email-confirmation.service";
import {PasswordChangeRequestContext} from "./contexts/password-change-request.context";
import {PasswordChangeService} from "../services/password-confirmation.service";

let authProvider = provide(AuthHttp, {
    useFactory: (http, storage) => {
        return new AuthHttp(new AuthConfig({
            headerName: "x-access-token",
            headerPrefix: " ",
            tokenName: AUTH_TOKEN,
            tokenGetter: () => storage.getItem(AUTH_TOKEN),
            globalHeaders: [{'Content-Type': 'application/json'}],
            noJwtError: true
        }), http);
    },
    deps: [Http, AbstractStorage]
});


let storageProvider = provide(AbstractStorage, {
    useFactory: () => new DelegateStorage(localStorage)
});

@Component({
    selector: 'app',
    templateUrl: 'app/templates/app.component.html',
    directives: [AuthComponent, AdminComponent, EmailConfirmationComponent, ROUTER_DIRECTIVES],
    providers: [AuthService, HTTP_PROVIDERS, JwtHelper, authProvider, storageProvider,
        UserService, UserContext, ROUTER_PROVIDERS, NewUserContext, EmailConfirmationContext, EmailConfirmationService
        , PasswordChangeService,PasswordChangeRequestContext]
})
@Routes([
    {path: '/home', component: HomeComponent},
    {path: '/users', component: UsersComponent},
    {path: '/user/setting', component: UserComponent},
    {path: '*', component: HomeComponent}
])
export class AppComponent {

    constructor(private _authService:AuthService, private _userContext:UserContext, private _router:Router) {
        if (this._userContext.isLoggedIn()) {
            this._router.navigate(['/home']);
        }

    }


    public userContext() {
        return this._userContext;
    }

    public logout() {
        this._userContext.setUser(null);
        this._authService.logout();
    }


}