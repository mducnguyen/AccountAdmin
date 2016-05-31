import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
/**
 * @author DucNguyenMinh
 * @since 30/05/16
 */


@Injectable()
export class PasswordChangeService {

    constructor(private _http: Http) {}

    getConfirmationEmail(username: string): Observable<any> {

        return this._http.get('/api/users/'+username+'/new_password_confirmation')
            .map(res => {
                let result = res.json();
                if (result.success) {
                    return {text:result.text}
                } else {
                    return {text:"No email was found! Please request new Email!"};
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });

    }

    confirmRequest(link: string): Observable<any> {

        return this._http.get(link)
            .map(res =>{
                let result = res.json();
                return result;
            })
            .catch(err => {
                let errMsg = err.json().message || 'Unkown error';
                return Observable.throw(errMsg);
            });

    }

    resetPassword(link:string, password:string): Observable<any> {
        let options = {
            headers: new Headers({'Content-Type':'application/json'})
        };
        return this._http.post(link, JSON.stringify({password: password}), options)
            .map(res => {
                let result = res.json();
                return result;
            })
            .catch(err => {
                let errMsg = err.json().message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }
}