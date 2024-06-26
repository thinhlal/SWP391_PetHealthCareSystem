const express = require('express');
const router = express.Router();

const {
  verifyToken,
} = require('../app/controllers/MiddlewareController');
const ManageBookingsController = require('../app/controllers/ManageBookingsController');

router.post(
  '/add',
  verifyToken,
  ManageBookingsController.add,
);
router.post(
  '/',
  verifyToken,
  ManageBookingsController.index,
);

module.exports = router;
