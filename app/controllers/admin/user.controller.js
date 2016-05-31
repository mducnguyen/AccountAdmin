/**
 * Created by DucNguyenMinh on 10/05/16.
 */
var User = require('../../models/user');

var emailConfirmService = require('../../service/email-confirm.service');

var bcrypt = require('bcrypt');

var userController = {};


// userController.registerUser = function (req, res, next) {
//     User.findOne({name: req.body.name}, function (err, user) {
//         if (err) throw err;
//
//         if (user) {
//             res.status(409).json({
//                 success: false,
//                 message: 'User with the name: ' + req.body.name + ' already existed'
//             });
//         } else if (!user) {
//
//             var email = req.body.email || "";
//
//             var newUser = new User({
//                 name: req.body.name,
//                 password: req.body.password,
//                 email: email,
//                 admin: false,
//                 confirmed: false
//             });
//
//             newUser.save(function (err) {
//                 if (err) throw err;
//
//                 console.log('User \"' + req.body.name + '\" saved successfully');
//                 res.status(200).json({success: true, user: {name: req.body.name, email: req.body.email}});
//             })
//         }
//     });
// };

userController.registerUser = function (req, res, next) {
    User.findOne({name: req.body.name}, function (err, user) {
        if (err) throw err;

        if (user) {
            res.status(409).json({
                success: false,
                message: 'User with the name: ' + req.body.name + ' already existed'
            });
        } else if (!user) {

            var email = req.body.email || "";
            var name  = req.body.name;
            var password = req.body.password;

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password,salt,function (err, hash) {
                    var newUser = new User({
                        name: name,
                        password:hash,
                        email: email,
                        admin: false,
                        confirmed: false,
                        resetPWRequest:false
                    });

                    newUser.save(function (err) {
                        if (err) throw err;

                        console.log('User \"' + req.body.name + '\" saved successfully');
                        res.status(200).json({success: true, user: {name: req.body.name, email: req.body.email}});
                    })
                });
            });
        }
    });
};

userController.changePassword = function (req, res, next) {

    User.findOne({name:req.body.name}, function (err, user) {
        if (user){

            var new_password = req.body.new_password;
            var old_password = req.body.old_password;



            bcrypt.compare(old_password, user._doc.password, function (err, res) {
                if (res){
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            User.update({name: req.body.name}, {$set: {password: hash}}, function (err) {
                                if (err) {
                                    throw err;
                                }
                                res.status(200).json({success: true, message: 'Password changed!'});
                            });

                        });
                    });
                } else {
                    res.status(400).json({succes:false, message:'The old password is not correct!'});
                    return;
                }
            });
            //
            // if (user._doc.password != req.body.old_password) {
            //
            //
            // }
        } else {
            res.status(404).json({succes:false, message:'There is no such user!'});
        }
    });


};


userController.changeEmail = function (req, res, next) {

    User.findOne({name:req.params.name}, function (err, user) {
        if (user){
            User.update({name:req.body.name}, {$set:{email:req.body.email, confirmed: false}}, function (err) {
                if (err){
                    throw err;
                }

                res.status(200).json({success:true, message:'Email changed!'});
            });
        } else {
            res.status(404).json({success:false, message:'There is no such user!'});
        }
    });
};


userController.deleteUser = function (req, res, next) {

    User.remove({name:req.params.name}, function (err) {
        if (err) throw err;

        res.status(200).json({success:true, message:'User deleted!'});
    })

};

userController.getAllUsers = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) throw err;

        var responeBody = [];

        users.forEach(function (entry) {
            responeBody.push({
                name:entry._doc.name,
                email:entry._doc.email,
                admin:entry._doc.admin,
                confirmed:entry._doc.confirmed,
                PRrequested : entry._doc.resetPWRequest,
                uri:"/api/users/"+entry._doc.name
            });
        });

        res.status(200).json(responeBody);
    })
};

userController.getConfirmationText = function (req, res, next) {
    User.findOne({name:req.params.name}, function (err, user) {
        if (user){

            emailConfirmService.composeEmailText(user, function (err, result) {
                res.status(200).json({success:true, text : result.text});
            });
        } else {
            res.status(404).json({success:false, message:'There is no such user!'});
        }
    });
};

module.exports = userController;