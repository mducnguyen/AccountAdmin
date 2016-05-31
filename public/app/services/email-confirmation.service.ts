import {Injectable} from '@angular/core'
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
/**
 * @author DucNguyenMinh
 * @since 29/05/16
 */

@Injectable()
export class EmailConfirmationService{

    constructor(private authHttp:AuthHttp, private http: Http) {}

    getConfirmationEmail(user: User): Observable<any> {

        return this.authHttp.get('/api/users/'+user.name+'/email-confirm/require')
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

    confirmEmail(link: string): Observable<any> {

        return this.http.get(link)
            .map(res =>{
                let result = res.json();
                return result;
            })
            .catch(err => {
                let errMsg = err.json().message || 'Unkown error';
                return Observable.throw(errMsg);
            });

    }

}