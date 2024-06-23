const express = require('express');
const router = express.Router();

const petController = require('../app/controllers/PetController');

//Save pet
router.post('/savepet', petController.savePet);
module.exports = router;
