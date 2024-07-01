const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController');

const manageBookingController = require('../app/controllers/ManageBookingController');

router.post(
  '/addHaveCustomer',
  verifyToken,
  manageBookingController.addBookingHaveCustomer,
);
router.patch(
  '/updateBookingDoctors',
  verifyToken,
  manageBookingController.updateBookingDoctors,
);
router.post(
  '/addNotHaveCustomer',
  verifyToken,
  manageBookingController.addBookingNotHaveCustomer,
);
router.post('/', verifyToken, manageBookingController.index);

module.exports = router;
