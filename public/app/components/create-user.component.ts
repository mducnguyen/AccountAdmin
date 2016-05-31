import {Component} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {NewUserContext} from "./contexts/new-user.context";
import {UserContext} from "./contexts/user.context";
/**
 * @author DucNguyenMinh
 * @since 28/05/16
 */


@Component({
    selector: 'create-user',
    templateUrl: 'app/templates/create-user.component.html'
})
export class CreateUserComponent {
    newUser :User = {};

    message:string;

    success:boolean;

    confirmation:Object;

    constructor(private _userService:UserService, private _newUserContext: NewUserContext, private _userContext: UserContext) {
    }

    createNewUser() {
        this._userService.createUser(this.newUser).subscribe(
            result => {
                this.confirmation = { success:result.success ,message:"User Created!"} ;
                this._newUserContext.addNewUser(this.newUser);
            },
            err => {
                this.confirmation = { success:false ,message: "User Existed!"} ;
            }
        );
    }

    userContext(): UserContext {
        return this._userContext;
    }
}