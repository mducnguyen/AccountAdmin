/**
 * Created by DucNguyenMinh on 10/05/16.
 */
var User = require('../models/user');
var emailConfirmService = require('../service/email-confirm.service');
var passResetService = require('../service/password-reset.service');
var bcrypt = require('bcrypt');

var userController = {};

userController.changePassword = function (req, res, next) {

    if (req.decoded.name == req.params.name) {
        User.findOne({name: req.body.name}, function (err, user) {
            if (user) {

                bcrypt.compare(req.body.old_password, use._doc.password, function (err, ressult) {

                    if (!result) {
                        res.status(400).json({succes: false, message: 'The old password is not correct!'});
                        return;
                    } else {

                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.new_password, salt, function (err, hash) {
                                User.update({name: req.body.name}, {$set: {password: hash}}, function (err) {

                                    if (err) {
                                        throw err;
                                    }

                                    res.status(200).json({success: true, message: 'Password changed!'});
                                });
                            });
                        });
                    }
                });
            } else {
                res.status(404).json({succes: false, message: 'There is no such user!'});
            }
        });
    } else {
        res.status(403).json({success: false, message: 'You are not allowed to change password of this user!'});
    }

};

userController.resetPassword = function (req, res, next) {

    if (req.decoded.name == req.params.name) {
        User.findOne({name: req.decoded.name}, function (err, user) {
            if (user) {

                if (user._doc.resetPWRequest) {
                    res.status(400).json({success: false, message: "Request hasn't been confirmed yet!"});
                    return;
                } else {

                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            User.update({name: req.decoded.name}, {$set: {password: hash}}, function (err) {

                                if (err) {
                                    throw err;
                                }

                                res.status(200).json({success: true, message: 'Password changed!'});
                            });
                        });
                    });
                }
            } else {
                res.status(404).json({succes: false, message: 'There is no such user!'});
            }
        });
    } else {
        res.status(403).json({success: false, message: 'You are not allowed to change password of this user!'});
    }
};

userController.changeEmail = function (req, res, next) {
    if (req.decoded.name == req.params.name) {
        User.findOne({name: req.params.name}, function (err, user) {
            if (user) {
                User.update({name: req.body.name}, {$set: {email: req.body.email, confirmed: false}}, function (err) {
                    if (err) {
                        throw err;
                    }

                    res.status(200).json({success: true, message: 'Email changed!'});
                });
            } else {
                res.status(404).json({succes: false, message: 'There is no such user!'});
            }
        });
    } else {
        res.status(403).json({success: false, message: 'You are not allowed to change email of this user!'});
    }
};

userController.getUser = function (req, res, next) {
    if (req.decoded.name == req.params.name) {
        User.findOne({name: req.params.name}, function (err, user) {
            if (user) {
                res.status(200).json({
                    name: user._doc.name,
                    email: user._doc.email,
                    admin: user._doc.admin,
                    uri: '/api/users/' + user._doc.name,
                    confirmed: user._doc.confirmed,
                    PRrequested : user._doc.resetPWRequest
                });
            } else {
                res.status(404).json({succes: false, message: 'There is no such user!'});
            }
        });
    } else {
        res.status(403).json({success: false, message: 'You are not allowed to see information of this user!'});
    }
};


userController.confirmEmail = function (req, res, next) {
    if (req.decoded.name == req.params.name) {

        var confirmToken = req.query.confirm_token || req.headers.confirm_token;

        if (confirmToken) {

            emailConfirmService.confirm(confirmToken, function (err, result) {

                if (err) {
                    res.status(500).json({success: false, message: "Unknown Error"})
                }

                if (result.status == "expired") {
                    res.status(417).json({
                        success: false,
                        message: 'The Confirmation link is already expired! Please request for a new confirmation email!'
                    });
                } else if (result.status == "confirmed") {
                    res.status(200).json({success: true, message: 'Your email has been confirm!'})
                }
            });

        } else {
            return res.status(404).send({
                success: false,
                message: 'No confirm_token provided.'
            });

        }

    } else {
        res.status(403).json({success: false, message: 'You are not allowed to confirm for this user of this user!'});
    }
};

userController.getConfirmationText = function (req, res, next) {
    User.findOne({name: req.params.name}, function (err, user) {
        if (user) {

            emailConfirmService.composeEmailText(user, function (err, result) {
                res.status(200).json({success: true, text: result.text});
            });
        } else {
            res.status(404).json({success: false, message: 'There is no such user!'});
        }
    });
};


userController.getNewPasswordConfirmation = function (req, res, next) {
    User.findOne({name: req.params.name}, function (err, user) {
        if (user) {

            passResetService.composeEmailText(user, function (err, email) {
                User.update({name: user._doc.name}, {$set: {resetPWRequest: true}}, function (err, result) {
                    res.status(200).json({success: true, text: email.text});
                });
            });
        } else {
            res.status(404).json({success: false, message: 'There is no such user!'});
        }
    });
};

userController.confirmPasswordResetRequest = function (req, res, next) {
    if (req.decoded.name == req.params.name) {

        var confirmToken = req.query.confirm_token || req.headers.confirm_token;

        if (confirmToken) {

            passResetService.confirm(confirmToken, function (err, result) {

                if (err) {
                    res.status(500).json({success: false, message: "Unknown Error"})
                }

                if (result.status == "expired") {
                    res.status(417).json({
                        success: false,
                        message: 'The Confirmation link is already expired! Please request for a new confirmation email!'
                    });
                } else if (result.status == "confirmed") {
                    res.status(200).json({
                        success: true,
                        message: 'You can reset your password now!',
                        resetLink: result.link
                    })
                }
            });

        } else {
            return res.status(404).send({
                success: false,
                message: 'No confirm_token provided.'
            });

        }

    } else {
        res.status(403).json({
            success: false,
            message: 'You are not allowed to confirm for this request of this user!'
        });
    }
};

module.exports = userController;