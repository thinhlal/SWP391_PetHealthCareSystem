const express = require('express');
const router = express.Router();

const MiddlewareController = require('../app/controllers/MiddlewareController');
const PaymentController = require('../app/controllers/PaymentController');

router.post(
  '/create-order',
  MiddlewareController.verifyToken,
  PaymentController.createOrder,
);
router.get('/paypal-success', PaymentController.captureOrder);
router.get('/paypal-cancel', PaymentController.paymentCancel);
router.post('/', MiddlewareController.verifyToken, PaymentController.index);

module.exports = router;
