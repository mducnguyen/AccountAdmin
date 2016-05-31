/**
 * Created by DucNguyenMinh on 29/05/16.
 */

var passResetService = {};
var configs = require('../../configs/config');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

passResetService.composeEmailText = function (user, callback) {
    var userToken = {
        name: user._doc.name,
        email: user._doc.email,
        admin: user._doc.admin,
        uri: '/api/users/' + user._doc.name
    };

    var authToken = jwt.sign(userToken, configs.secret, {
        expiresIn: '1d'
    });

    var confirm_token = jwt.sign(userToken, configs.confirm_key, {
        expiresIn: "30m"
    });

    var emailText = buildEmail(userToken,authToken,confirm_token);


    callback(null,{text:emailText});
};

var buildEmail = function (user, authToken, confirm_token) {
    return configs.hostname+'/api/users/'+user.name+'/password_reset_confirm?'+'token='+authToken+'&confirm_token='+confirm_token;
};

passResetService.confirm = function (confirmToken, callback) {
    if (confirmToken) {
        var result ={};

        jwt.verify(confirmToken, configs.confirm_key, function (err, decoded) {
            if (err) {
                result = {status:"expired"};
            } else {

                User.update({name:decoded.name }, {$set: {resetPWRequest: false}}, function (err) {
                    if (err) {
                        throw err;
                    }

                    User.findOne({name:decoded.name}, function (err, user) {

                        var userToken = {
                            name: user._doc.name,
                            email: user._doc.email,
                            admin: user._doc.admin,
                            uri: '/api/users/' + user._doc.name
                        };

                        var token = jwt.sign(userToken, configs.secret, {
                            expiresIn: "1d"
                        });

                        var link = buildRestLink(user,token);

                        result = {status:"confirmed", link : link};

                        callback( null, result);
                    })
                });
            }

        });

    } else {
        return {status:"No Token provided!"}
    }
};


var buildRestLink = function (user, token) {

    return '/api/users/'+user.name+'/reset_password?'+'token='+token;

};

module.exports = passResetService;