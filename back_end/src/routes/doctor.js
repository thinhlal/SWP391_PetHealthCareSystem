const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController');

const doctorController = require('../app/controllers/DoctorController');

router.get('/getAllDoctors', verifyToken, doctorController.getAllDoctors);
router.get(
  '/getAllDoctorsInfoToShow',
  doctorController.getAllDoctorsInfoToShow,
);
router.get(
  '/getBookingByID/:bookingID',
  verifyToken,
  doctorController.getBookingByID,
);
router.get('/schedules', verifyToken, doctorController.schedules);
router.post(
  '/updateDoctorInfo',
  verifyToken,
  doctorController.updateDoctorInfo,
);
router.patch(
  '/updateImageDoctor',
  verifyToken,
  doctorController.updateImageDoctor,
);
router.get(
  '/getDoctorProfile/:accountID',
  verifyToken,
  doctorController.getDoctorProfile,
);
router.get('/getTimeWork', verifyToken, doctorController.getTimeWork);
router.post('/addTimeWork', verifyToken, doctorController.addTimeWork);
router.post(
  '/savePetExamRecord',
  verifyToken,
  doctorController.savePetExamRecord,
);

module.exports = router;
