const Booking = require('../models/Booking.js');
const Payment = require('../models/Payment.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class BookingController {
  // POST /(add)
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
        });
        await saveServiceBookingVet.save();
      }
      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ paymentID: -1 });
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

  // GET /getAllBookingsID/:accountID
  async getAllBookingsID(req, res, next) {
    const { accountID } = req.params;
    try {
      const allBookings = await Booking.aggregate([
        { $match: { accountID } },
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'pets',
            localField: 'petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctorID',
            foreignField: 'doctorID',
            as: 'doctorDetails',
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentsDetails',
          },
        },
        {
          $lookup: {
            from: 'servicebookingvets',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'servicebookingvetsDetails',
          },
        },
        {
          $lookup: {
            from: 'rates',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'rateDetails',
          },
        },
        {
          $unwind: {
            path: '$servicebookingvetsDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'services',
            localField: 'servicebookingvetsDetails.serviceID',
            foreignField: 'serviceID',
            as: 'servicebookingvetsDetails.servicesDetails',
          },
        },
        {
          $group: {
            _id: '$_id',
            bookingID: { $first: '$bookingID' },
            accountID: { $first: '$accountID' },
            petID: { $first: '$petID' },
            doctorID: { $first: '$doctorID' },
            name: { $first: '$name' },
            phone: { $first: '$phone' },
            email: { $first: '$email' },
            dateBook: { $first: '$dateBook' },
            startTime: { $first: '$startTime' },
            endTime: { $first: '$endTime' },
            totalPrice: { $first: '$totalPrice' },
            dateCancelBook: { $first: '$dateCancelBook' },
            isCancel: { $first: '$isCancel' },
            isCheckIn: { $first: '$isCheckIn' },
            isPrepayment: { $first: '$isPrepayment' },
            isRate: { $first: '$isRate' },
            isRefund: { $first: '$isRefund' },
            refundPrice: { $first: '$refundPrice' },
            customerDetails: { $first: '$customerDetails' },
            rateDetails: { $first: '$rateDetails' },
            petDetails: { $first: '$petDetails' },
            doctorDetails: { $first: '$doctorDetails' },
            servicebookingvetsDetails: { $push: '$servicebookingvetsDetails' },
            paymentsDetails: { $first: '$paymentsDetails' },
          },
        },
        {
          $addFields: {
            servicesInBooking: {
              $map: {
                input: '$servicebookingvetsDetails',
                as: 'servicebookingvet',
                in: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$$servicebookingvet.servicesDetails',
                        as: 'service',
                        cond: {
                          $eq: [
                            '$$service.serviceID',
                            '$$servicebookingvet.serviceID',
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            bookingID: 1,
            accountID: 1,
            petID: 1,
            name: 1,
            phone: 1,
            email: 1,
            dateBook: 1,
            startTime: 1,
            endTime: 1,
            totalPrice: 1,
            dateCancelBook: 1,
            isCancel: 1,
            isCheckIn: 1,
            isPrepayment: 1,
            isRate: 1,
            isRefund: 1,
            refundPrice: 1,
            doctorID: 1,
            customerDetails: 1,
            petDetails: 1,
            doctorDetails: 1,
            servicebookingvetsDetails: 1,
            servicesInBooking: 1,
            paymentsDetails: 1,
            rateDetails: 1,
          },
        },
      ]);
      res.status(201).json({ allBookings });
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking ', error });
    }
  }

  // GET /getAllBookings
  async getAllBookings(req, res, next) {
    try {
      const allBookings = await Booking.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'pets',
            localField: 'petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctorID',
            foreignField: 'doctorID',
            as: 'doctorDetails',
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentsDetails',
          },
        },
        {
          $lookup: {
            from: 'servicebookingvets',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'servicebookingvetsDetails',
          },
        },
        {
          $unwind: {
            path: '$servicebookingvetsDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'services',
            localField: 'servicebookingvetsDetails.serviceID',
            foreignField: 'serviceID',
            as: 'servicebookingvetsDetails.servicesDetails',
          },
        },
        {
          $group: {
            _id: '$_id',
            bookingID: { $first: '$bookingID' },
            accountID: { $first: '$accountID' },
            petID: { $first: '$petID' },
            doctorID: { $first: '$doctorID' },
            name: { $first: '$name' },
            phone: { $first: '$phone' },
            email: { $first: '$email' },
            dateBook: { $first: '$dateBook' },
            startTime: { $first: '$startTime' },
            endTime: { $first: '$endTime' },
            totalPrice: { $first: '$totalPrice' },
            dateCancelBook: { $first: '$dateCancelBook' },
            isCancel: { $first: '$isCancel' },
            isCheckIn: { $first: '$isCheckIn' },
            isPrepayment: { $first: '$isPrepayment' },
            isRate: { $first: '$isRate' },
            isRefund: { $first: '$isRefund' },
            refundPrice: { $first: '$refundPrice' },
            customerDetails: { $first: '$customerDetails' },
            petDetails: { $first: '$petDetails' },
            doctorDetails: { $first: '$doctorDetails' },
            servicebookingvetsDetails: { $push: '$servicebookingvetsDetails' },
            paymentsDetails: { $first: '$paymentsDetails' },
          },
        },
        {
          $addFields: {
            servicesInBooking: {
              $map: {
                input: '$servicebookingvetsDetails',
                as: 'servicebookingvet',
                in: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$$servicebookingvet.servicesDetails',
                        as: 'service',
                        cond: {
                          $eq: [
                            '$$service.serviceID',
                            '$$servicebookingvet.serviceID',
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            bookingID: 1,
            accountID: 1,
            petID: 1,
            name: 1,
            phone: 1,
            email: 1,
            dateBook: 1,
            startTime: 1,
            endTime: 1,
            totalPrice: 1,
            dateCancelBook: 1,
            isCancel: 1,
            isCheckIn: 1,
            isPrepayment: 1,
            isRate: 1,
            isRefund: 1,
            refundPrice: 1,
            doctorID: 1,
            customerDetails: 1,
            petDetails: 1,
            doctorDetails: 1,
            servicebookingvetsDetails: 1,
            servicesInBooking: 1,
            paymentsDetails: 1,
          },
        },
      ]);
      res.status(201).json({ allBookings });
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking ', error });
    }
  }

  // POST /cancelBooking
  async cancelBooking(req, res, next) {
    const { bookingID } = req.body;
    try {
      const booking = await Booking.findOneAndUpdate(
        { bookingID: bookingID },
        {
          isCancel: true,
          dateCancelBook: new Date(),
        },
        { new: true, runValidators: true },
      );
      res.status(201).json({ booking });
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking ', error });
    }
  }

  // GET /getBookingDataByID
  async getBookingDataByID(req, res, next) {
    const { bookingID } = req.params;
    try {
      const bookingData = await Booking.aggregate([
        { $match: { bookingID } },
        {
          $lookup: {
            from: 'accounts',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'accountDetails',
          },
        },
        {
          $lookup: {
            from: 'pets',
            localField: 'petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
      ]);
      res.status(200).json(bookingData);
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking ', error });
    }
  }
}

module.exports = new BookingController();
