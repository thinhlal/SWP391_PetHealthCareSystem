const Booking = require('../models/Booking.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class ManageBookingsController {
  // POST /
  async index(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  async add(req, res, next) {
    //const bookingInfo = req.body;
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }
}

module.exports = new ManageBookingsController();
