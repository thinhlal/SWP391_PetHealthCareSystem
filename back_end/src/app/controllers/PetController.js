const Pet = require('../models/Pet.js');

class PetController {
  // GET /updatePetPatch/:petID
  async updatePetPatch(req, res, next) {
    const { petID } = req.params;
    const { petDataUpdate } = req.body;
    try {
      const updatedPet = await Pet.findOneAndUpdate({ petID }, petDataUpdate, {
        new: true,
      });
      if (!updatedPet) {
        return res.status(404).json({ message: 'Pet not found' });
      }

      res.status(200).json(updatedPet);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching pets', error: error.message });
    }
  }

  // GET /getAllPets/:accountID
  async getAllPets(req, res, next) {
    const { accountID } = req.params;
    try {
      const allPets = await Pet.find({ accountID });
      res.status(200).json(allPets);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching pets', error: error.message });
    }
  }

  // GET /getPetID/:petID
  async getPetID(req, res, next) {
    const { petID } = req.params;
    try {
      const pet = await Pet.aggregate([
        { $match: { petID } },
        {
          $lookup: {
            from: 'medicalreports',
            localField: 'petID',
            foreignField: 'petID',
            as: 'medicalReportDetails',
          },
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'vaccinationpets',
            let: { petID: '$petID' },
            pipeline: [
              { $match: { $expr: { $eq: ['$petID', '$$petID'] } } },
              {
                $lookup: {
                  from: 'vaccinations',
                  let: { vaccinationID: '$vaccinationID' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$vaccinationID', '$$vaccinationID'] },
                      },
                    },
                    {
                      $project: {
                        name: 1,
                        quantity: 1,
                        status: 1,
                        nextDate: 1,
                        notes: 1,
                      },
                    },
                  ],
                  as: 'vaccinationDetails',
                },
              },
              {
                $addFields: {
                  vaccinationDetails: {
                    $arrayElemAt: ['$vaccinationDetails', 0],
                  },
                },
              },
            ],
            as: 'vaccinationPetDetails',
          },
        },
      ]);
      res.status(200).json(pet);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching pets', error: error.message });
    }
  }

  // GET /searchPet/:petIDOrName
  async petIDOrName(req, res, next) {
    const { petIDOrName } = req.params;
    try {
      const listPets = await Pet.find({
        $or: [
          { petID: { $regex: petIDOrName, $options: 'i' } },
          { name: { $regex: petIDOrName, $options: 'i' } },
        ],
      });
      res.status(200).json(listPets);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error searchID or Name pets', error: error.message });
    }
  }

  // GET /searchPet/:accountID
  async searchPetWithAccountID(req, res, next) {
    const { accountID } = req.params;
    try {
      const listPets = await Pet.find({ accountID });
      res.status(200).json(listPets);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error searchID or Name pets', error: error.message });
    }
  }

  // POST /add
  async add(req, res, next) {
    try {
      let { accountID, name, birthday, breed, type, gender, image } = req.body;
      let id;
      while (true) {
        try {
          const lastPetId = await Pet.findOne().sort({ petID: -1 });
          if (lastPetId) {
            const lastID = parseInt(lastPetId.petID.substring(2));
            id = 'PE' + (lastID + 1).toString().padStart(6, '0');
          } else {
            id = 'PE000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      const newPet = new Pet({
        petID: id,
        accountID: accountID,
        name: name,
        birthday: birthday,
        petType: type.toUpperCase(),
        breed: breed,
        gender: gender.toUpperCase(),
        image: image,
      });
      await newPet.save();
      res.status(201).json({ message: 'Save successfully', petID: id });
    } catch (error) {
      console.error('Save pet data to database error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new PetController();
