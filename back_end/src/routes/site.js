const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const { verifyToken } = require('../app/controllers/MiddlewareController');

//Sign Up
router.post('/signup', siteController.signUp);

//Check Phone Exist Sign Up
router.get('/checkPhoneSignUp', siteController.checkPhoneSignUp);

//Log In
router.post('/login', siteController.logIn);

//Refresh Token
router.post('/refresh', siteController.requestRefreshToken);

//Log Out
router.post('/logout', verifyToken, siteController.logOut);

//Home
router.get('/', siteController.index);

module.exports = router;
