import {Injectable} from '@angular/core'
import {User} from "../../models/user";
import {AbstractStorage} from "../../services/storage/abstract.storage";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
/**
 * @author DucNguyenMinh
 * @since 14/05/16
 */

@Injectable()
export class NewUserContext {

    private _observers : Observer<User>[] = [];

    listenToNewUser(): Observable<User> {
        return new Observable<User>((observer : Observer<User>) => {
            this._observers.push(observer);
        });
    }


    addNewUser(user: User){
        this._observers.forEach(observer => {
            observer.next(user);
        });
    }

}
