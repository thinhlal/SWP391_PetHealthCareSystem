const express = require('express');
const router = express.Router();
const {
  verifyToken,
} = require('../app/controllers/MiddlewareController');

const petController = require('../app/controllers/PetController');

router.patch('/updatePet/:petID', verifyToken, petController.updatePetPatch);
router.get('/getAllPets/:accountID', verifyToken, petController.getAllPets);
router.get('/getPetID/:petID', verifyToken, petController.getPetID);
router.post('/add', verifyToken, petController.add);

module.exports = router;
