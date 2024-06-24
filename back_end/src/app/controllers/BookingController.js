const Booking = require('../models/Booking.js');
const Payment = require('../models/Payment.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class BookingController {
  // POST /
  async index(req, res, next) {
    const bookingInfo = req.body.bookingData;
    try {
      let idBooking;
      while (true) {
        try {
          const lastBooking = await Booking.findOne().sort({ bookingID: -1 });
          if (lastBooking) {
            const lastID = parseInt(lastBooking.bookingID.substring(2));
            idBooking = 'BK' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idBooking = 'BK000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const saveBooking = new Booking({
        bookingID: idBooking,
        accountID: bookingInfo.customerID,
        ...bookingInfo,
      });
      await saveBooking.save();

      const services = bookingInfo.services;
      for (let i = 0; i < services.length; i++) {
        let idServiceBookingVet;
        const service = services[i];
        while (true) {
          try {
            const lastServiceBookingVet =
              await ServiceBookingVet.findOne().sort({
                serviceBookingVetID: -1,
              });
            if (lastServiceBookingVet) {
              idServiceBookingVet =
                parseInt(lastServiceBookingVet.serviceBookingVetID) + 1;
            } else {
              idServiceBookingVet = 0;
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }
        const saveServiceBookingVet = new ServiceBookingVet({
          serviceBookingVetID: idServiceBookingVet,
          bookingID: idBooking,
          serviceID: service.serviceID,
          doctorID: bookingInfo.doctorID,
        });
        await saveServiceBookingVet.save();
      }
      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ paymentID: -1 });
          console.log(bookingInfo.lastPayment);
          if (lastPayment) {
            const lastID = parseInt(lastPayment.paymentID.substring(2));
            idPayment = 'PA' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPayment = 'PA000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const createPayment = {
        paymentID: idPayment,
        bookingID: idBooking,
        isSuccess: false,
        date: new Date(),
        totalPrice: bookingInfo.totalPrice,
        paymentMethod: bookingInfo.paymentMethod.toUpperCase(),
      };
      const payment = new Payment(createPayment);
      await payment.save();
      res.status(201).json({
        message: 'Booking successfully created',
        bookingID: idBooking,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }
}

module.exports = new BookingController();
