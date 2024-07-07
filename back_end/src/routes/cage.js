const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const CageController = require('../app/controllers/CageController');

router.post('/addPetToCage', verifyToken, CageController.addPetToCage);
router.get('/getAllCages', verifyToken, CageController.getAllCages);
router.get(
  '/getAllDiseaseInfoByID',
  verifyToken,
  CageController.getAllDiseaseInfoByID,
);
router.get(
  '/getDiseaseByDoctorID',
  verifyToken,
  CageController.getDiseaseByDoctorID,
);
router.post('/updateCageInfo', verifyToken, CageController.updateCageInfo);
router.post(
  '/deleteDiseaseInfoByID',
  verifyToken,
  CageController.deleteDiseaseInfoByID,
);

module.exports = router;
