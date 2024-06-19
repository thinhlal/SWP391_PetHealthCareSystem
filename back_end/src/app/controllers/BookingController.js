const Booking = require('../models/Booking.js');

class BookingController {
  // POST /
  index(req, res, next) {
    const userInfo = req.body;
    res.json(userInfo)
  }
}

module.exports = new BookingController();
