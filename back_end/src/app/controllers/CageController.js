const Booking = require('../models/Booking.js');
const Cage = require('../models/Cage.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');

class AdminController {
    // Get /getAllCages
    async getAllCages(req, res, next) {
        try {
            const allCages = await Cage.aggregate([
                {
                    $lookup: {
                        from: 'cagediseases',
                        localField: 'cageID',
                        foreignField: 'cageID',
                        as: 'cageDiseaseDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: 'cageDiseaseDetails.bookingID',
                        foreignField: 'bookingID',
                        as: 'bookingDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'pets',
                        localField: 'cageDiseaseDetails.petID',
                        foreignField: 'petID',
                        as: 'petDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'accounts',
                        localField: 'petDetails.accountID',
                        foreignField: 'accountID',
                        as: 'accountDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'accountDetails.accountID',
                        foreignField: 'accountID',
                        as: 'customerDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'doctors',
                        localField: 'cageDiseaseDetails.doctorID',
                        foreignField: 'doctorID',
                        as: 'doctorDetailCage',
                    },
                },
                {
                    $project: {
                        'accountDetails' : 0
                    },
                },
            ]);
            res.status(200).json(allCages);
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error fetching doctor', error: error.message });
        }
    }
}

module.exports = new AdminController();
