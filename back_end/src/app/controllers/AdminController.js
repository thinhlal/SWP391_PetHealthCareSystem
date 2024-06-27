const Booking = require('../models/Booking.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class AdminController {
  // POST /
  async index(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /add
  async add(req, res, next) {
    //const bookingInfo = req.body;
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }
}

module.exports = new AdminController();
