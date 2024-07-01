const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController');

const bookingController = require('../app/controllers/BookingController');

router.get(
  '/getBookingID/:bookingID',
  verifyToken,
  bookingController.getBookingDataByID,
);
router.get(
  '/getAllBookings/:accountID',
  verifyToken,
  bookingController.getAllBookingsID,
);
router.get('/getAllBookings', verifyToken, bookingController.getAllBookings);
router.post('/cancelBooking', verifyToken, bookingController.cancelBooking);
router.post('/', verifyToken, bookingController.index);

module.exports = router;
