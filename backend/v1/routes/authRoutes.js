const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

// register new user and issue jwt
router.post('/register', authController.register);

// confirm user email
router.get('/confirm/:token', authController.confirmEmail);

// login existing user and issue jwt
router.post('/login', authController.login);

// request password reset
router.post('/forgot', authController.requestPasswordReset);

// reset user password
router.post('/reset/:token', authController.resetPassword);

// logout user
router.post('/logout', authController.logout);


module.exports = router;