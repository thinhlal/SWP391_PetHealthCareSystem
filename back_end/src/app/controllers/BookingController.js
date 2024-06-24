const { response } = require('express');
const Booking = require('../models/Booking.js');
const Payment = require('../models/Payment.js');
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
      const saveBooking = new Booking({ id: idBooking, ...bookingInfo.bookingData });
      await saveBooking.save();

      const services = bookingInfo.bookingData.services;
      let idServiceBookingVet;
      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        while (true) {
          try {
            const lastServiceBookingVet = await ServiceBookingVet.findOne().sort({ id: -1 });
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
          serviceID: service.id,
          doctorID: bookingInfo.bookingData.doctorID,
        });
        await saveServiceBookingVet.save();
      }

      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ id: -1 });
          if (lastPayment) {
            const lastID = parseInt(lastPayment.id.substring(2));
            idPayment = 'PA' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPayment = 'PA000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      console.log(bookingInfo.bookingData.paymentMethod.toUpperCase());
      const createPayment = {
        id: idPayment,
        bookingID: idBooking,
        isSuccess: false,
        date: new Date(),
        totalPrice:
          bookingInfo.bookingData.totalPrice,
        paymentMethod: bookingInfo.bookingData.paymentMethod.toUpperCase(),
      };
      const payment = new Payment(createPayment);
      await payment.save();
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
