import {Component, OnInit} from '@angular/core'
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {UserContext} from "./contexts/user.context";
import {CreateUserComponent} from "./create-user.component";
import {NewUserContext} from "./contexts/new-user.context";
import {EmailConfirmationContext} from "./contexts/email-confirmation.context";
import {EmailConfirmationService} from "../services/email-confirmation.service";
/**
 * @author DucNguyenMinh
 * @since 15/05/16
 */

@Component({
    selector: 'users',
    templateUrl: 'app/templates/users.component.html',
    directives: [CreateUserComponent]
})
export class UsersComponent {
    users:User[];

    confirmMsg:Object;

    constructor(private _userService:UserService, private _userContext:UserContext,
                private _newUserContext:NewUserContext, private _emailConfirmContext:EmailConfirmationContext,
                private _emailConfirmService: EmailConfirmationService) {
        this._userService.getUsers().subscribe(
            users => this.users = users,
            err => {
            }
        );

        this._newUserContext.listenToNewUser().subscribe(
            user => this.users.push(user)
        );
    }

    userContext():UserContext {
        return this._userContext;
    }

    updateEmail(user:User) {
        this._userService.adminUpdateEmail(user).subscribe(
            alert => {
                this.confirmMsg = {success: alert.success, message: alert.message};
                user.confirmed = false;
                this._emailConfirmService.getConfirmationEmail(user).subscribe(result => {
                    this._emailConfirmContext.setToBeConfirm(user);
                    this._emailConfirmContext.setConfirmationText(result.text);
                });
            },
            err => {
                this.confirmMsg = {success: false, message: "Update Failed"}
            }
        );
    }

    delete(user:User) {
        this._userService.delete(user).subscribe(
            alert => {
                if (alert.success) {
                    this.removeFromUsers(user);
                }
                this.confirmMsg = {success: alert.success, message: alert.message};
            },
            err => {
                this.confirmMsg = {success: false, message: "Delete Failed"}
            }
        );
    }

    private removeFromUsers(toberemoveUser):boolean {
        let deleted = false;

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name == toberemoveUser.name) {
                this.users.splice(i, 1);
                deleted = true;
            }
        }

        return deleted;
    }

    getEmailConfirmation(user: User) {

        this._emailConfirmService.getConfirmationEmail(user).subscribe(
            result => {
                this._emailConfirmContext.setToBeConfirm(user);
                this._emailConfirmContext.setConfirmationText(result.text);
            }
        );

    }

}