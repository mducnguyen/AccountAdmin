import {Component} from '@angular/core'
import {EmailConfirmationService} from "../services/email-confirmation.service";
import {EmailConfirmationContext} from "./contexts/email-confirmation.context";
import {User} from "../models/user";
/**
 * @author DucNguyenMinh
 * @since 23/05/16
 */

@Component({
    selector: 'email-confirmation',
    templateUrl: 'app/templates/email-confirmation.component.html'
})
export class EmailConfirmationComponent {

    emailText:string;

    confirmed:boolean;

    confirmedSuccess: boolean;

    confirmText: string;

    constructor(private _emailConfirmService:EmailConfirmationService, private _emailConfirmContext:EmailConfirmationContext) {
        this._emailConfirmContext.listenConfirmation().subscribe(
            text => {
                this.emailText = text;
                this.confirmed =false;
                this.confirmedSuccess =false;
            }
        );
    }

    getTobeConfirmUser():User {
        return this._emailConfirmContext.tobeConfirmUser;
    }

    emailConfirmContext(): EmailConfirmationContext {
        return this._emailConfirmContext;
    }

    confirmEmail() {
        this._emailConfirmService.confirmEmail(this.emailText).subscribe(
            result => {
                this.confirmed = true;
                if (result.success){
                    this.confirmedSuccess = true;
                    this._emailConfirmContext.tobeConfirmUser.confirmed = true;
                } else {
                    this.confirmedSuccess = false;
                }
                this.confirmText = result.message;
            },
            err => {
                this.confirmed = true;
                this.confirmedSuccess = false;
                this.confirmText = err;
            }
        );
    }
}