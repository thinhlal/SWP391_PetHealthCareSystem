const Doctor = require('../models/Doctor.js');

class DoctorController {
    // GET /
    async index(req, res, next) {
        try {
            const allDoctors = await Doctor.aggregate([
                {
                    $lookup: {
                        from: 'workinghours',
                        localField: 'doctorID',
                        foreignField: 'doctorID',
                        as: 'workingHoursDetails',
                    }
                },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: 'doctorID',
                        foreignField: 'doctorID',
                        as: 'bookingDetails',
                    }
                },
                {
                    $addFields: {
                        matchingBookings: {
                            $filter: {
                                input: '$bookingDetails',
                                as: 'booking',
                                cond: {
                                    $in: [
                                        { $dateToString: { format: "%Y-%m-%d", date: "$$booking.dateBook" } },
                                        {
                                            $map: {
                                                input: '$workingHoursDetails',
                                                as: 'working',
                                                in: { $dateToString: { format: "%Y-%m-%d", date: "$$working.date" } }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    $project: {
                        doctorID: 1,
                        accountID: 1,
                        name: 1,
                        phone: 1,
                        email: 1,
                        workingHoursDetails: 1,
                        matchingBookings: 1
                    }
                },
            ]);
            res.status(200).json(allDoctors);
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({ message: 'Error fetching doctor', error: error.message });
        }
    }

    // POST /add
    async add(req, res, next) {
        try {

        } catch (error) {
            console.error('Save pet data to database error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new DoctorController();
