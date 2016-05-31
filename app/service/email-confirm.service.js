
const fs = require('fs');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/config');
var User = require('../models/user');

var emailConfirmService = {};

emailConfirmService.confirm = function (confirmToken, callback) {


    if (confirmToken) {
        var result ={};

        jwt.verify(confirmToken, configs.confirm_key, function (err, decoded) {
            if (err) {
                result = {status:"expired"};
            } else {

                User.update({name:decoded.name }, {$set: {confirmed: true}}, function (err) {
                    if (err) {
                        throw err;
                    }
                });

                result = {status:"confirmed"};
            }

            callback( null, result);
        });

    } else {
        return {status:"No Token provided!"}
    }

};


emailConfirmService.composeEmailText = function (user, callback) {

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
    return configs.hostname+'/api/users/'+user.name+'/email-confirm?'+'token='+authToken+'&confirm_token='+confirm_token;
};

module.exports = emailConfirmService;