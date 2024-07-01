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
                      cond: { $eq: ['$$service.serviceID', '$$servicebookingvet.serviceID'] },
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
    res.status(200).json(allBookings);
  } catch (error) {
    res.status(500).json({ message: 'Error when get booking', error });
  }
}

}

module.exports = new AdminController();
