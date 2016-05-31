/**
 * Created by DucNguyenMinh on 10/05/16.
 */


module.exports = {
    secret : "superSecreteCodeThatNoOneWouldKnow",
    confirm_key: "thisIsSomeKeyThatWeUseToConfirmEmail",
    hostname:"https://localhost:3000",
    database:{
        development :"mongodb://localhost/users",
        test:"mongodb://localhost/test"
    }
};