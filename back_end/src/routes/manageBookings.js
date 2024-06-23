const express = require('express');
const router = express.Router();

const MiddlewareController = require('../app/controllers/MiddlewareController');
const ManageBookingsController = require('../app/controllers/ManageBookingsController');

router.post(
  '/add',
  MiddlewareController.verifyToken,
  ManageBookingsController.add,
);
router.post(
  '/',
  MiddlewareController.verifyToken,
  ManageBookingsController.index,
);

module.exports = router;
