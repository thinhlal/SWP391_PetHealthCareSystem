const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController');

const doctorController = require('../app/controllers/DoctorController');

router.get('/getAllDoctors', verifyToken, doctorController.getAllDoctors);
router.get(
  '/getBookingByID/:bookingID',
  verifyToken,
  doctorController.getBookingByID,
);
router.get('/schedules', verifyToken, doctorController.schedules);
router.get('/getTimeWork', verifyToken, doctorController.getTimeWork);
router.post('/addTimeWork', verifyToken, doctorController.addTimeWork);
router.post(
  '/savePetExamRecord',
  verifyToken,
  doctorController.savePetExamRecord,
);

module.exports = router;
