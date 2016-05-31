import {Injectable} from '@angular/core'
import {User} from "../../models/user";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
/**
 * @author DucNguyenMinh
 * @since 29/05/16
 */

@Injectable()   
export class EmailConfirmationContext{

    private _observers : Observer<any>[] = [];

    tobeConfirmUser: User;

    listenConfirmation(): Observable<any> {
        return new Observable<any>((observer : Observer<any>) => {
            this._observers.push(observer);
        });
    }

    setToBeConfirm(user:User) {
        this.tobeConfirmUser = user;
    }

    setConfirmationText(text:string) {

        this._observers.forEach(observer => {
            observer.next(text);
        });

    }
}