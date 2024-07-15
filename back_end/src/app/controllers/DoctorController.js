const Doctor = require('../models/Doctor.js');
const WorkingHour = require('../models/WorkingHour.js');
const Booking = require('../models/Booking.js');
const MedicalReport = require('../models/MedicalReport.js');
const VaccinationPet = require('../models/VaccinationPet.js');

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

  // GET /getBookingByID
  async getBookingByID(req, res, next) {
    const { bookingID } = req.params;
    try {
      const booking = await Booking.aggregate([
        { $match: { bookingID } },
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
      ]);
      res.status(200).json(booking[0]);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching doctor', error: error.message });
    }
  }

  // GET /schedules
  async schedules(req, res, next) {
    const { doctorID, date } = req.query;
    try {
      const allBookings = await Doctor.aggregate([
        { $match: { doctorID } },
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
            workingHoursDetails: {
              $filter: {
                input: '$workingHoursDetails',
                as: 'workingHour',
                cond: {
                  $eq: [
                    {
                      $dateToString: {
                        format: '%Y-%m-%d',
                        date: '$$workingHour.date',
                      },
                    },
                    date,
                  ],
                },
              },
            },
            matchingBookings: {
              $filter: {
                input: '$bookingDetails',
                as: 'booking',
                cond: {
                  $and: [
                    {
                      $eq: [
                        {
                          $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$$booking.dateBook',
                          },
                        },
                        date,
                      ],
                    },
                    { $eq: ['$$booking.isCompleted', false] },
                  ],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: '$matchingBookings',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'pets',
            localField: 'matchingBookings.petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
        {
          $addFields: {
            'matchingBookings.petDetails': { $arrayElemAt: ['$petDetails', 0] },
          },
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'matchingBookings.accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $addFields: {
            'matchingBookings.customerDetails': {
              $arrayElemAt: ['$customerDetails', 0],
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'matchingBookings.bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $addFields: {
            'matchingBookings.paymentDetails': {
              $arrayElemAt: ['$paymentDetails', 0],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            doctorID: { $first: '$doctorID' },
            accountID: { $first: '$accountID' },
            name: { $first: '$name' },
            phone: { $first: '$phone' },
            email: { $first: '$email' },
            workingHoursDetails: { $first: '$workingHoursDetails' },
            matchingBookings: { $push: '$matchingBookings' },
          },
        },
        {
          $addFields: {
            matchingBookings: {
              $cond: {
                if: { $eq: [{ $size: '$matchingBookings' }, 1] },
                then: {
                  $cond: {
                    if: { $eq: ['$matchingBookings', [{}]] },
                    then: [],
                    else: '$matchingBookings',
                  },
                },
                else: '$matchingBookings',
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
      res.status(200).json(allBookings[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error fetching doctor schedule',
        error: error.message,
      });
    }
  }

  // POST /addTimeWork
  async addTimeWork(req, res, next) {
    const { doctorID, date, startTime, endTime, isOff, isFullTime } = req.body;
    try {
      const workingHour = await WorkingHour.findOne({
        doctorID: doctorID,
        date: date,
      });

      if (workingHour) {
        if (!isOff && !isFullTime) {
          await WorkingHour.findOneAndUpdate(
            { workingID: workingHour.workingID },
            {
              startTime,
              endTime,
              isOff: false,
              isFulltime: false,
            },
          );
        } else if (isOff) {
          await WorkingHour.findOneAndUpdate(
            { workingID: workingHour.workingID },
            {
              startTime: null,
              endTime: null,
              isOff: true,
              isFulltime: false,
            },
          );
        } else if (isFullTime) {
          await WorkingHour.findOneAndUpdate(
            { workingID: workingHour.workingID },
            {
              startTime: '08:00',
              endTime: '17:00',
              isOff: false,
              isFulltime: true,
            },
          );
        }
      } else {
        let id;
        while (true) {
          try {
            const lastWorking = await WorkingHour.findOne().sort({
              workingID: -1,
            });
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

        if (!isOff && !isFullTime) {
          const newWorking = new WorkingHour({
            workingID: id,
            doctorID: doctorID,
            startTime,
            endTime,
            date: new Date(date),
          });
          await newWorking.save();
        } else if (isOff) {
          const newWorking = new WorkingHour({
            workingID: id,
            doctorID: doctorID,
            isOff: true,
            date: new Date(date),
          });
          await newWorking.save();
        } else if (isFullTime) {
          const newWorking = new WorkingHour({
            workingID: id,
            doctorID: doctorID,
            startTime: '08:00',
            endTime: '17:00',
            isFulltime: true,
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

  // POST /savePetExamRecord
  async savePetExamRecord(req, res, next) {
    const {
      bookingID,
      diagnosis,
      treatment,
      prescription,
      notes,
      selectedVaccines,
    } = req.body;
    try {
      const booking = await Booking.findOne({ bookingID });

      await Booking.findOneAndUpdate(
        { bookingID },
        {
          isCompleted: true,
        },
      );

      let id;
      while (true) {
        try {
          const lastMedicalReport = await MedicalReport.findOne().sort({
            medicalReportID: -1,
          });
          if (lastMedicalReport) {
            id = parseInt(lastMedicalReport.medicalReportID) + 1;
          } else {
            id = 0;
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const newMedicalReport = new MedicalReport({
        medicalReportID: id,
        accountID: booking.accountID,
        petID: booking.petID,
        bookingID,
        diagnosis,
        treatment,
        prescription,
        notes,
      });
      await newMedicalReport.save();

      if (selectedVaccines.length > 0) {
        for (let i = 0; i < selectedVaccines.length; i++) {
          const vaccine = selectedVaccines[i];
          let idVaccine;
          while (true) {
            try {
              const lastVaccinationPetID = await VaccinationPet.findOne().sort({
                vaccinationPetID: -1,
              });
              if (lastVaccinationPetID) {
                idVaccine = parseInt(lastVaccinationPetID.vaccinationPetID) + 1;
              } else {
                idVaccine = 0;
              }
              break;
            } catch (error) {
              console.log(error);
            }
          }
          const newVaccinePet = new VaccinationPet({
            vaccinationPetID: idVaccine,
            medicalReportID: id,
            vaccinationID: parseInt(vaccine.vaccinationID),
            bookingID,
            petID: booking.petID,
            dateGiven: new Date(),
          });
          await newVaccinePet.save();
        }
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error fetching medical report',
        error: error.message,
      });
    }
  }
}

module.exports = new DoctorController();
