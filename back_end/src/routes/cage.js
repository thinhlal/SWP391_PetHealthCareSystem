const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const CageController = require('../app/controllers/CageController');

router.post('/addCage', verifyToken, CageController.addCage);
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
router.get(
  '/getAllCagesByAdmin',
  verifyToken,
  CageController.getAllCagesByAdmin,
);
router.post('/updateCageInfo', verifyToken, CageController.updateCageInfo);
router.post('/updateCageAdmin', verifyToken, CageController.updateCageAdmin);
router.post(
  '/deleteDiseaseInfoByID',
  verifyToken,
  CageController.deleteDiseaseInfoByID,
);

module.exports = router;
