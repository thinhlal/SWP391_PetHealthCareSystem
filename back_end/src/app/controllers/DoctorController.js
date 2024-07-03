const Doctor = require('../models/Doctor.js');
const WorkingHour = require('../models/WorkingHour.js');

class DoctorController {
  // GET /getTimeWork
  async getTimeWork(req, res, next) {
    try {
      const { doctorID } = req.query;
      const workingHours = await WorkingHour.find({ doctorID });
      res.json(workingHours);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch working hours' });
    }
  }

  // GET /getAllDoctors
  async getAllDoctors(req, res, next) {
    try {
      const allDoctors = await Doctor.aggregate([
        {
          $lookup: {
            from: 'workinghours',
            localField: 'doctorID',
            foreignField: 'doctorID',
            as: 'workingHoursDetails',
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: 'doctorID',
            foreignField: 'doctorID',
            as: 'bookingDetails',
          },
        },
        {
          $addFields: {
            matchingBookings: {
              $filter: {
                input: '$bookingDetails',
                as: 'booking',
                cond: {
                  $in: [
                    {
                      $dateToString: {
                        format: '%Y-%m-%d',
                        date: '$$booking.dateBook',
                      },
                    },
                    {
                      $map: {
                        input: '$workingHoursDetails',
                        as: 'working',
                        in: {
                          $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$$working.date',
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            doctorID: 1,
            accountID: 1,
            name: 1,
            phone: 1,
            email: 1,
            workingHoursDetails: 1,
            matchingBookings: 1,
          },
        },
      ]);
      res.status(200).json(allDoctors);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching doctor', error: error.message });
    }
  }

  // POST /addTimeWork
  async addTimeWork(req, res, next) {
    const { doctorID, date, startTime, endTime, isOff } = req.body
    try {
      const workingHour = await WorkingHour.findOne({
        doctorID: doctorID,
        date: date,
      });

      if (workingHour) {
        if (!isOff) {
          await WorkingHour.findOneAndUpdate({ workingID: workingHour.workingID }, {
            startTime,
            endTime,
            isOff: false,
          });
        } else {
          await WorkingHour.findOneAndUpdate({ workingID: workingHour.workingID }, {
            startTime: null,
            endTime: null,
            isOff: true,
          });
        }
      } else {
        let id;
        while (true) {
          try {
            const lastWorking = await WorkingHour.findOne().sort({ workingID: -1 });
            if (lastWorking) {
              id = parseInt(lastWorking.workingID) + 1;
            } else {
              id = 0;
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }

        if (!isOff) {
          const newWorking = new WorkingHour({
            workingID: id,
            doctorID: doctorID,
            startTime,
            endTime,
            date: new Date(date),
          });
          await newWorking.save();
        } else {
          const newWorking = new WorkingHour({
            workingID: id,
            doctorID: doctorID,
            isOff: true,
            date: new Date(date),
          });
          await newWorking.save();
        }
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching doctor', error: error.message });
    }
  }
}

module.exports = new DoctorController();
