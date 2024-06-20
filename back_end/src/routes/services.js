const express = require('express');
const router = express.Router();
const MiddlewareController = require('../app/controllers/MiddlewareController');

const serviceController = require('../app/controllers/ServiceController.js');

router.get('/', MiddlewareController.verifyToken, serviceController.getAllServices);

module.exports = router;
