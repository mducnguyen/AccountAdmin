/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
import {Component, OnInit} from '@angular/core';
import {AuthService, AUTH_TOKEN} from "../services/auth.service";
import {UserContext} from "./contexts/user.context";
import {AbstractStorage} from "../services/storage/abstract.storage";
import {PasswordChangeRequestContext} from "./contexts/password-change-request.context";
import {PasswordChangeService} from "../services/password-confirmation.service";
import {PasswordConfirmationComponent} from "./password-confirmation.component";

@Component({
    selector: 'auth',
    templateUrl: 'app/templates/auth.component.html',
    directives:[PasswordConfirmationComponent]
})
export class AuthComponent {

    name:string;
    password:string;
    confirmMsg:Object;
    requestedPasswordConfirmation: boolean;

    constructor(private _authService:AuthService,
                private _userContext:UserContext,
                private _storage:AbstractStorage,
                private _passwordChangeRequestContext:PasswordChangeRequestContext,
                private _passwordConfirmation:PasswordChangeService) {
        this.checkForCurrentUser();
        this.loginWithCert();
        // this.requestedPasswordConfirmation = true;
        // this.requestedPasswordConfirmation = false;
    }

    login() {
        this._authService.login(this.name, this.password).subscribe(
            user => {
                this._userContext.setUser(user.user)
            },
            error => {
                this.confirmMsg = {success: false, message: error};
            }
        );


    }

    checkForCurrentUser() {
        var token = this._storage.getItem(AUTH_TOKEN);
        if (token) {
            this._authService.getCurrentUser(token).subscribe(
                user => {
                    this._userContext.setUser(user);
                },
                error => {

                }
            );
        }
    }

    sendChangePasswordRequest(username:string) {
        this.requestedPasswordConfirmation = true;
        this._passwordConfirmation.getConfirmationEmail(username).subscribe(
           text => {
               this._passwordChangeRequestContext.setConfirmationText(text.text);
           }
        );
    }

    loginWithCert() {
        this._authService.loginWithCert().subscribe(
            user => {
                this._userContext.setUser(user.user)
            },
            error => {
                this.confirmMsg = {success: false, message: error};
            }
        );
    }
}
