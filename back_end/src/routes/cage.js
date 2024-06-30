const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const CageController = require('../app/controllers/CageController');

router.post('/addPetToCage', verifyToken, CageController.addPetToCage);
router.get('/getAllCages', verifyToken, CageController.getAllCages);
router.post('/updateCageInfo', verifyToken, CageController.updateCageInfo);

module.exports = router;
