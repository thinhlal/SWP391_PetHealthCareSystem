const express = require('express');
const router = express.Router();
const {
  verifyToken,
} = require('../app/controllers/MiddlewareController');

const doctorController = require('../app/controllers/DoctorController');

router.get('/getAllDoctors', verifyToken, doctorController.getAllDoctors);

module.exports = router;
