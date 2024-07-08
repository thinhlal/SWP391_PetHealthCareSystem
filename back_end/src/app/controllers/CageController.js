const Booking = require('../models/Booking.js');
const Cage = require('../models/Cage.js');
const Pet = require('../models/Pet.js');
const CageDisease = require('../models/CageDisease.js');
const DiseaseInfo = require('../models/DiseaseInfo.js');

class AdminController {
  // GET /getAllCages
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
          $set: {
            cageDiseaseDetails: {
              $sortArray: {
                input: '$cageDiseaseDetails',
                sortBy: { startDate: -1 },
              },
            },
          },
        },
        {
          $set: {
            cageDiseaseDetails: { $arrayElemAt: ['$cageDiseaseDetails', 0] },
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
            accountDetails: 0,
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

  // GET /getDiseaseByDoctorID
  async getDiseaseByDoctorID(req, res, next) {
    const { doctorID } = req.query;
    try {
      const allCageDiseases = await CageDisease.aggregate([
        { $match: { doctorID } },
        {
          $lookup: {
            from: 'cages',
            localField: 'cageID',
            foreignField: 'cageID',
            as: 'cageDetails',
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
            from: 'bookings',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'bookingDetails',
          },
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'bookingDetails.accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
      ]);
      res.status(200).json(allCageDiseases);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching cage disease', error: error.message });
    }
  }

  // GET /getAllDiseaseInfoByID
  async getAllDiseaseInfoByID(req, res, next) {
    const { cageDiseaseID } = req.query;
    try {
      const allCageDiseases = await CageDisease.aggregate([
        { $match: { cageDiseaseID } },
        {
          $lookup: {
            from: 'diseaseinfos',
            localField: 'cageDiseaseID',
            foreignField: 'cageDiseaseID',
            as: 'diseaseInfoDetails',
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
            from: 'bookings',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'bookingDetails',
          },
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'bookingDetails.accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
      ]);
      res.status(200).json(allCageDiseases[0]);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching cage disease', error: error.message });
    }
  }

  // POST /updateCageInfo
  async updateCageInfo(req, res, next) {
    const { cageDiseaseID, petCondition, statusPet, textPetInfo } = req.body;
    try {
      let idDiseaseInfo;
      while (true) {
        try {
          const lastBooking = await DiseaseInfo.findOne().sort({
            diseaseInfoID: -1,
          });
          if (lastBooking) {
            const lastID = parseInt(lastBooking.diseaseInfoID);
            idDiseaseInfo = lastID + 1;
          } else {
            idDiseaseInfo = 0;
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      const diseaseInfo = new DiseaseInfo({
        diseaseInfoID: idDiseaseInfo,
        cageDiseaseID: cageDiseaseID,
        date: new Date(),
        notes: textPetInfo,
        status: petCondition,
      });
      await diseaseInfo.save();
      if (statusPet === 'Recover') {
        await CageDisease.findOneAndUpdate(
          { cageDiseaseID },
          {
            dischargeDate: new Date(),
            isRecover: true,
          },
        );

        const cageDisease = await CageDisease.aggregate([
          { $match: { cageDiseaseID } },
          {
            $lookup: {
              from: 'pets',
              localField: 'petID',
              foreignField: 'petID',
              as: 'petDetails',
            },
          },
        ]);
        const petID = cageDisease[0].petDetails[0].petID;
        await Pet.findOneAndUpdate(
          { petID },
          {
            status: true,
          },
        );

        const cageID = cageDisease[0].cageID;
        await Cage.findOneAndUpdate(
          { cageID },
          {
            isEmpty: true,
          },
        );
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching cage', error: error.message });
    }
  }

  // POST /addPetToCage
  async addPetToCage(req, res, next) {
    const { formData } = req.body;
    try {
      let idCageDisease;
      while (true) {
        try {
          const lastCageDisease = await CageDisease.findOne().sort({
            cageDiseaseID: -1,
          });
          if (lastCageDisease) {
            const lastID = parseInt(lastCageDisease.cageDiseaseID.substring(2));
            idCageDisease = 'CD' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idCageDisease = 'CD000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const pet = await Booking.aggregate([
        { $match: { bookingID: formData.bookingID } },
        {
          $lookup: {
            from: 'pets',
            localField: 'petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
      ]);

      await Pet.findOneAndUpdate(
        { petID: pet[0].petDetails[0].petID },
        {
          status: false,
        },
      );

      await Cage.findOneAndUpdate(
        { cageID: formData.cageID },
        {
          isEmpty: false,
        },
      );

      const cageDisease = new CageDisease({
        cageID: formData.cageID,
        petID: pet[0].petDetails[0].petID,
        bookingID: formData.bookingID,
        cageDiseaseID: idCageDisease,
        doctorID: formData.doctorID,
        startDate: new Date(),
        reasonForAdmission: formData.reasonForAdmission,
      });

      await cageDisease.save();
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching cage', error: error.message });
    }
  }

  // POST /deleteDiseaseInfoByID
  async deleteDiseaseInfoByID(req, res, next) {
    const { diseaseInfoID } = req.body;
    try {
      await DiseaseInfo.findOneAndDelete({ diseaseInfoID });
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error fetching cage', error: error.message });
    }
  }
}

module.exports = new AdminController();
