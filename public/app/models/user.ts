/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

export class User {
    id: string;
    name:string;
    email: string;
    admin: boolean;
    password: string;
    confirmed: boolean;
    PRrequested :boolean;


    constructor(id:string, name:string, email:string, admin:boolean,confirmed: boolean, PRrequested:boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
        this.password = "";
        this.confirmed = confirmed;
        this.PRrequested = PRrequested;
    }


}