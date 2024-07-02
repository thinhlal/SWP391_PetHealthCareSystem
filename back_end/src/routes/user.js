const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const UserController = require('../app/controllers/UserController');


router.get('/getUserProfile/:accountID', verifyToken, UserController.getUserProfileByID);
router.post('/changePassword', verifyToken, UserController.changePassword);
router.post('/deleteAccount', verifyToken, UserController.deleteAccount);

module.exports = router;
