const express = require('express');
const router = express.Router();
const {
  verifyToken,
  checkRole,
} = require('../app/controllers/MiddlewareController');

const bookingController = require('../app/controllers/BookingController');

router.post('/', verifyToken, checkRole(['Customer']), bookingController.index);

module.exports = router;
