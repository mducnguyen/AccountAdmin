/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
"use strict";
var User = (function () {
    function User(id, name, email, admin, confirmed, PRrequested) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
        this.password = "";
        this.confirmed = confirmed;
        this.PRrequested = PRrequested;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map