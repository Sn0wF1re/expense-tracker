const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

// register new user and issue jwt
router.post('/register', authController.register);

// login existing user and issue jwt
router.post('/login', authController.login);

module.exports = router;