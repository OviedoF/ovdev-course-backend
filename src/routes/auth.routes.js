const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require(path.join(__dirname, '..', 'controllers', 'auth.controller'));
const verifySignUp = require(path.join(__dirname, '..', 'middlewares', 'verifySignUp'));

router.post('/signup', [verifySignUp.checkDuplicateEmail], authController.signUp);

router.post('/signin', authController.signIn);

router.post('/signin/whoiam', authController.identifyUserJSW);

module.exports = router;
