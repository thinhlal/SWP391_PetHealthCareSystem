const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const VaccineController = require('../app/controllers/VaccineController');

router.get('/getAllVaccines', verifyToken, VaccineController.getAllVaccines);

module.exports = router;
