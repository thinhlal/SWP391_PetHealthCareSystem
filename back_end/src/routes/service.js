const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController.js');

const serviceController = require('../app/controllers/ServiceController.js');

router.get('/getAllServices', verifyToken, serviceController.getAllServices);

module.exports = router;