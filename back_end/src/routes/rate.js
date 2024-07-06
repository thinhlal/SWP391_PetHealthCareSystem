const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController.js');

const rateController = require('../app/controllers/RateController.js');

router.post('/addRateStart', verifyToken, rateController.addRateStart);
router.get('/getAllRates', verifyToken, rateController.getAllRates);

module.exports = router;
