import {Injectable} from '@angular/core'
import {User} from "../../models/user";
import {AbstractStorage} from "../../services/storage/abstract.storage";
/**
 * @author DucNguyenMinh
 * @since 14/05/16
 */

@Injectable()
export class UserContext {

    private _currentUser: User;
        
    setUser(user: User){
        this._currentUser = user;
    }

    getCurrentUser(): User {
        return this._currentUser;
    }

    isLoggedIn(): Boolean {
        return this._currentUser != null;
    }

    isAdmin(): Boolean {
        return this._currentUser.admin;
    }
}