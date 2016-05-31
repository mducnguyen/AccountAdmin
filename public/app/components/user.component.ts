import {Component,OnInit} from '@angular/core'
import {UserContext} from "./contexts/user.context";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {EmailConfirmationService} from "../services/email-confirmation.service";
import {EmailConfirmationContext} from "./contexts/email-confirmation.context";
/**
 * @author DucNguyenMinh
 * @since 23/05/16
 */

@Component({
    selector: 'user',
    templateUrl: 'app/templates/user.component.html'
})
export class UserComponent {


    user: User;

    confirmMsg: Object;
    
    constructor(private _userContext: UserContext, private _userService: UserService,private _emailConfirmContext:EmailConfirmationContext,
                private _emailConfirmService: EmailConfirmationService){
        this.user = this._userContext.getCurrentUser();
        this._userService.getUser(this._userContext.getCurrentUser().id).subscribe(
            user => this.user = user
        );

    }

    userContext(): UserContext {
        return this._userContext;
    }

    saveInfo() {
         this._userService.updateEmail(this.user).subscribe(
             alert => {
                 this.confirmMsg = { success: alert.success, message:alert.message};
                 this.user.confirmed = false;
                 this._emailConfirmService.getConfirmationEmail(this.user).subscribe(result => {
                     this._emailConfirmContext.setToBeConfirm(this.user);
                     this._emailConfirmContext.setConfirmationText(result.text);
                 });
             },
             err => {this.confirmMsg = {success: false, message:"Update Failed"}}
         );
    }
}