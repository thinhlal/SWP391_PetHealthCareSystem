const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const VaccineController = require('../app/controllers/VaccineController');

router.get('/getAllVaccines', verifyToken, VaccineController.getAllVaccines);
router.get(
  '/getAllVaccinesAvailable',
  verifyToken,
  VaccineController.getAllVaccinesAvailable,
);
router.get(
  '/checkDuplicateName',
  verifyToken,
  VaccineController.checkDuplicateName,
);
router.post('/addVaccine', verifyToken, VaccineController.addVaccine);
router.post(
  '/updateVaccineAdmin',
  verifyToken,
  VaccineController.updateVaccineAdmin,
);
router.patch(
  '/updateStatusVaccine',
  verifyToken,
  VaccineController.updateStatusVaccine,
);

module.exports = router;
