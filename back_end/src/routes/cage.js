const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const CageController = require('../app/controllers/CageController');

router.get('/getAllCages', verifyToken, CageController.getAllCages);

module.exports = router;
