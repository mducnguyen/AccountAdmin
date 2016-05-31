import {Component, OnInit} from '@angular/core';
import {PasswordChangeService} from "../services/password-confirmation.service";
import {PasswordChangeRequestContext} from "./contexts/password-change-request.context";
/**
 * @author DucNguyenMinh
 * @since 30/05/16
 */


@Component({
    selector: 'password-confirmation',
    templateUrl: 'app/templates/password-confirmation.component.html'
})
export class PasswordConfirmationComponent implements OnInit{
    ngOnInit():any {

    }

    emailText:string;

    confirmed:boolean;

    confirmedSuccess:boolean;

    confirmText:string;

    resetConfirm: Object;

    password:string;

    rePassword:string;

    resetLink: string;

    constructor(private _passwordConfirmation:PasswordChangeService,
                private _passwordChangeRequestContext:PasswordChangeRequestContext) {
        var that = this;
        this._passwordChangeRequestContext.listenConfirmation().subscribe(
            text => {
                that.emailText = text;
                that.confirmed = false;
                that.confirmedSuccess = false;
            }
        );
    }

    confirmRequest(link:string) {
        this._passwordConfirmation.confirmRequest(link).subscribe(
            result => {
                this.confirmed = true;
                if (result.success) {
                    this.confirmedSuccess = true;
                } else {
                    this.confirmedSuccess = false;
                }
                this.confirmText = result.message;
                this.resetLink = result.resetLink;
            },
            err => {
                this.confirmed = true;
                this.confirmedSuccess = false;
                this.confirmText = err;
            }
        );
    }

    resetPassword(password:string) {
        let that = this;
        this._passwordConfirmation.resetPassword(this.resetLink,this.password).subscribe(
            result => {
                that.resetConfirm= {success : result.success ,message: result.message};
            },
            err => {
                that.resetConfirm = {success: false, message: err};
            }

        );
    }
}