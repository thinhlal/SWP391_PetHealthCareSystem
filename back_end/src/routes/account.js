const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const AccountController = require('../app/controllers/AccountController');

router.get(
  '/searchAccount/:accountIDOrUsername',
  verifyToken,
  AccountController.searchAccountIDOrUsername,
);

module.exports = router;
