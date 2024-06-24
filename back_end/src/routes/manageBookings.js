const express = require('express');
const router = express.Router();

const { verifyToken, checkRole } = require('../app/controllers/MiddlewareController');
const ManageBookingsController = require('../app/controllers/ManageBookingsController');

router.post(
  '/add',
  verifyToken,
  checkRole(['Employee']),
  ManageBookingsController.add,
);
router.post(
  '/',
  verifyToken,
  checkRole(['Employee']),
  ManageBookingsController.index,
);

module.exports = router;
