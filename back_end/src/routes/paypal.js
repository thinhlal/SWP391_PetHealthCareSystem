const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const PaymentController = require('../app/controllers/PaymentController');

router.post('/create-order', verifyToken, PaymentController.createOrder);
router.post('/paypal-success-getData', PaymentController.getData);
router.get('/paypal-success', PaymentController.captureOrder);
router.get('/paypal-cancel', PaymentController.paymentCancel);
router.post('/', PaymentController.index);

module.exports = router;
