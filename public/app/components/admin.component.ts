/**
 * @author DucNguyenMinh
 * @since 15/05/16
 */

import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UsersComponent} from "./users.component";
import {HomeComponent} from "./home.component";
import {UserContext} from "./contexts/user.context";

@Component({
    selector: 'admin',
    templateUrl: 'app/templates/admin.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@Routes([
    {
        path: '/users',
        component: UsersComponent
    },
    {
        path: '/home',
        component: HomeComponent
    }
])
export class AdminComponent {

    constructor(private _router:Router, private _userContext:UserContext) {
        this._router.navigate(['/admin/home']);
    }


    userContext():UserContext {
        return this._userContext;
    }
}