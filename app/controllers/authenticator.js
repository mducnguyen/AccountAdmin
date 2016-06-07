/**
 * Created by DucNguyenMinh on 10/05/16.
 */

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var config = require('../../configs/config');

var bcrypt = require('bcrypt');

var authenticator = {};


authenticator.authenticate = function (req, res, next) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(404).json({success: false, message: 'Authentication failed! Name or Password is not correct!'});
        } else if (user) {

            if (user._doc.confirmed) {
                var password = req.body.password;
                var hash = user._doc.password;

                bcrypt.compare(password, hash, function (err, result) {
                    if (!result) {
                        res.status(401).json({
                            success: false,
                            message: 'Authentication failed! Name or Password is not correct!'
                        })
                    } else {
                        var userToken = {
                            name: user._doc.name,
                            email: user._doc.email,
                            admin: user._doc.admin,
                            uri: '/api/users/' + user._doc.name
                        };

                        var token = jwt.sign(userToken, config.secret, {
                            expiresIn: "1d"
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Here is your token',
                            token: token,
                            url: ''
                        });
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Authentication failed! Your email hasn't been confirmed yet!"
                });
            }
        }
    });
};


authenticator.authenticateWithSsl = function (req, res, next) {

    if (req.client.authorized) {
        var subject = req.connection.getPeerCertificate().subject;

        User.findOne({name: subject.CN}, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.status(404).json({success: false, message: 'Authentication failed! Name or Password is not correct!'});
            } else if (user) {

                if (user._doc.confirmed) {
                    var userToken = {
                        name: user._doc.name,
                        email: user._doc.email,
                        admin: user._doc.admin,
                        uri: '/api/users/' + user._doc.name
                    };

                    var token = jwt.sign(userToken, config.secret, {
                        expiresIn: "1d"
                    });

                    res.status(200).json({
                        success: true,
                        message: 'Here is your token',
                        token: token,
                        url: ''
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Authentication failed! Your email hasn't been confirmed yet!"
                    });
                }
            }
        });
    } else {
        res.status(403).json({success: false});
    }


};

authenticator.verifyToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({sucess: false, message: 'Failed to authenticate'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(404).send({
            success: false,
            message: 'No token provided.'
        });
    }
};


authenticator.verifyAdmin = function (req, res, next) {

    if (req.decoded.admin) {
        next();
    } else {
        return res.status(403).json({sucess: false, message: 'Access denied! Admin only!'});
    }

};

// authenticator.register = function (req, res, next) {
//     var name = req.body.name;
//     var password = req.body.password;
//     var email = req.body.email;
//     Accounts.findOne( {name:name}, function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             if (result) {
//                 return res.status(409).json({success: false, message: "Username already exists!"});
//             }
//             else {
//                 Accounts.insert({
//                     name:name,
//                     password: password,
//                     email: email,
//                     admin: false
//                 }, function (err, result) {
//                     if (err) throw err;
//                     res.status(201).json({
//                         success: true,
//                         message: "Account created!",
//                         user: {
//                             username: username,
//                             uri: '/api/users/' + username
//                         }
//                     });
//                 });
//             }
//         }
//     );
// };

authenticator.register = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    User.findOne({name: name}, function (err, result) {
            if (err) {
                throw err;
            }
            if (result) {
                return res.status(409).json({success: false, message: "Username already exists!"});
            }
            else {

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        User.insert({
                            name: name,
                            password: hash,
                            email: email,
                            admin: false
                        }, function (err, result) {
                            if (err) throw err;
                            res.status(201).json({
                                success: true,
                                message: "Account created!",
                                user: {
                                    username: username,
                                    uri: '/api/users/' + username
                                }
                            });
                        });
                    });
                });
            }
        }
    );
};
// authenticator

module.exports = authenticator;