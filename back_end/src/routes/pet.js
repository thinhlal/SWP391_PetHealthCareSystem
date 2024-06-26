const express = require('express');
const router = express.Router();
const {
  verifyToken,
} = require('../app/controllers/MiddlewareController');

const petController = require('../app/controllers/PetController');

router.post('/add', verifyToken, petController.add);
router.get('/getAllPets/:accountID', verifyToken, petController.getAllPets);

module.exports = router;
