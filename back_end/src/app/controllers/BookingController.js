const Booking = require('../models/Booking.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class BookingController {
  // POST /
  async index(req, res, next) {
    const bookingInfo = req.body;
    try {
      let idBooking;
      while (true) {
        try {
          const lastBooking = await Booking.findOne().sort({ id: -1 });
          if (lastBooking) {
            const lastID = parseInt(lastBooking.id.substring(2));
            idBooking = 'BK' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idBooking = 'BK000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      let idServiceBookingVet;
      while (true) {
        try {
          const lastServiceBookingVet = await ServiceBookingVet.findOne().sort({
            id: -1,
          });
          if (lastServiceBookingVet) {
            idServiceBookingVet = parseInt(lastServiceBookingVet.id) + 1;
          } else {
            idServiceBookingVet = 0;
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const saveServiceBookingVet = new ServiceBookingVet({
        id: idServiceBookingVet,
        bookingID: idBooking,
        ...bookingInfo,
      });
      const saveBooking = new Booking({ id: idBooking, ...bookingInfo });
      await saveBooking.save();
      await saveServiceBookingVet.save();
      console.log(idBooking);
      res
        .status(201)
        .json({
          message: 'Booking successfully created',
          bookingID: idBooking,
        });
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }
}

module.exports = new BookingController();
