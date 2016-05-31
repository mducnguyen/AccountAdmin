/**
 * Created by DucNguyenMinh on 10/05/16.
 */

var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
var adminUserController = require('../controllers/admin/user.controller');
var authenticator = require('../controllers/authenticator');

router.options('/*', function (req, res, next) {
    res.send(200);
});

router.post('/register',adminUserController.registerUser);

router.post('/authenticate', authenticator.authenticate);

router.get('/users/:name/new_password_confirmation', userController.getNewPasswordConfirmation);

router.use(authenticator.verifyToken);

// router.user(authenticator.authorize);

router.post('/users/:name/reset_password', userController.resetPassword);

router.get('/users/:name/password_reset_confirm', userController.confirmPasswordResetRequest);

router.get('/users/:name', userController.getUser);

router.put('/users/:name/pw', userController.changePassword);

router.put('/users/:name/email', userController.changeEmail);

router.get('/users/:name/email-confirm', userController.confirmEmail);

router.get('/users/:name/email-confirm/require', userController.getConfirmationText);

router.use(authenticator.verifyAdmin);

router.get('/admin/users', adminUserController.getAllUsers);

router.post('/admin/users', adminUserController.registerUser);

router.put('/admin/users/:name/pw', adminUserController.changePassword);

router.put('/admin/users/:name/email', adminUserController.changeEmail);

router.delete('/admin/users/:name', adminUserController.deleteUser);

router.get('/admin/users/:name/email-confirm', adminUserController.getConfirmationText);

module.exports = router;