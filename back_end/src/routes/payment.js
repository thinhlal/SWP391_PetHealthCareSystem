const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/controllers/MiddlewareController');

const paymentController = require('../app/controllers/PaymentController');

router.patch(
  '/updatePaymentByID',
  verifyToken,
  paymentController.updatePaymentByID,
);

module.exports = router;
