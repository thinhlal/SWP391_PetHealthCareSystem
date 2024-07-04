const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const PaypalController = require('../app/controllers/PaypalController');

router.post('/create-order', verifyToken, PaypalController.createOrder);
router.post('/paypal-success-getData', PaypalController.getData);
router.post(
  '/refundPaymentBooking',
  verifyToken,
  PaypalController.refundPaymentBooking,
);
router.get('/paypal-success', PaypalController.captureOrder);
router.get('/paypal-cancel', PaypalController.paymentCancel);
router.post('/', PaypalController.index);

module.exports = router;
