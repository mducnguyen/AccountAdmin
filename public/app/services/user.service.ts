import {Injectable} from '@angular/core'
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx'
/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */
@Injectable()
export class UserService {

    constructor(private _http:AuthHttp) {
    }

    getUser(uri:string):Observable<User> {

        return this._http.get(uri)
            .map(res => {
                if (res.status == 200) {
                    let result = res.json();
                    return new User(result.uri, result.name, result.email, result.admin, result.confirmed,result.PRrequested);
                } else if (res.status == 403) {
                    throw new Error("Authorization failed: current user is not allowed to access this resource.");
                } else {
                    throw new Error("Unknown error");
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unknown error';
                return Observable.throw(errMsg);
            });

    }

    getUsers():Observable<any> {
        return this._http.get('/api/admin/users')
            .map(res => {
                if (res.status == 200) {
                    let result = res.json();
                    let users = [];
                    result.forEach(user => {
                        let newUser = new User(user.name, user.name, user.email, user.admin, user.confirmed, user.PRrequested);
                        users.push(newUser);
                    });
                    return users;
                } else {
                    throw new Error("Unknown Error!");
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }

    private getUsersUri():Observable<any> {
        return this._http.get('/api/admin/users')
            .map(res => {
                if (res.status == 200) {
                    let result = res.json();
                    let users = [];
                    result.forEach(function (user) {


                        users.push(user.uri);
                    });
                    return users;
                } else {
                    throw new Error("Unknown Error!");
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }


    adminUpdateEmail(user: User): Observable<any> {
        var body = {
            name : user.name,
            email : user.email
        };
        return this._http.put('/api/admin/users/'+ user.name+'/email', JSON.stringify(body))
            .map( res => {
                return res.json();
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }

    updateEmail(user:User):Observable<any> {

        var body = {
            name : user.name,
            email : user.email
        };
        return this._http.put('/api/users/'+ user.name+'/email', JSON.stringify(body))
            .map( res => {
                return res.json();
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }

    createUser(user:User):Observable<any>  {

        let body = {
            name: user.name,
            email: user.email,
            password: user.password
        };

        return this._http.post('/api/register',JSON.stringify(body))
            .map( res => {
                return res.json();
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });

    }

    delete(user:User) :Observable<any>{
        return this._http.delete('/api/admin/users/'+user.name)
            .map( result => result.json())
            .catch(err => {});
    }
}

