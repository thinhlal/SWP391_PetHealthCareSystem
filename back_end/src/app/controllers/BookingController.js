const Booking = require('../models/Booking.js');

class BookingController {
  // POST /
  index(req, res, next) {
    const bookingInfo = req.body;
    res.json(bookingInfo)
  }
}

module.exports = new BookingController();
