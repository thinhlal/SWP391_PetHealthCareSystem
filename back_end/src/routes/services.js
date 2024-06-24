const express = require('express');
const router = express.Router();
const {
  verifyToken,
  checkRole,
} = require('../app/controllers/MiddlewareController');

const serviceController = require('../app/controllers/ServiceController.js');

router.post(
  '/',
  verifyToken,
  checkRole(['Customer']),
  serviceController.getAllServices,
);

module.exports = router;
