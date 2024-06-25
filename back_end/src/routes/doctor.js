const express = require('express');
const router = express.Router();
const {
  verifyToken,
  checkRole,
} = require('../app/controllers/MiddlewareController');

const doctorController = require('../app/controllers/DoctorController');

router.post('/', verifyToken, checkRole(['Customer']), doctorController.index);

module.exports = router;
