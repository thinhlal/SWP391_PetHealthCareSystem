const Pet = require('../models/Pet.js');

class PetController {
  // GET /
  async index(req, res, next) {
    const customerID = req.body.customerID;
    try {
      const allPets = await Pet.find({ customerID });
      res.status(200).json(allPets);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching pets', error: error.message });
    }
  }

  // POST /add
  async add(req, res, next) {
    try {
      let { customerID, name, birthday, breed, type, gender, image } = req.body;
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
        customerID: customerID,
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
