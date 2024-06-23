const axios = require('axios');
const Payment = require('../models/Payment.js');
const { getAccessToken, PAYPAL_API } = require('../../config/paypal/paypal');

class PaymentController {
  async index(req, res) {
    res.send('Payment Page');
  }

  async createOrder(req, res) {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: req.body.amount,
            },
            custom_id: req.body.bookingID,
          },
        ],
        application_context: {
          return_url: 'http://localhost:5000/paypal/paypal-success',
          cancel_url: 'http://localhost:5000/paypal/paypal-cancel',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'PetHealthCare',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    res.json({
      id: response.data.id,
      url: response.data.links.find(link => link.rel === 'approve').href,
    });
  }

  async captureOrder(req, res) {
    try {
      const { token } = req.query;
      const accessToken = await getAccessToken();
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ id: -1 });
          if (lastPayment) {
            const lastID = parseInt(lastPayment.id.substring(2));
            idPayment = 'PA' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPayment = 'PA000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const bookingID =
        response.data.purchase_units[0].payments.captures[0].custom_id;
      const data = {
        id: idPayment,
        bookingID: bookingID,
        isSuccess: response.data.status === 'COMPLETED' ? true : false,
        date: new Date(),
        totalPrice:
          response.data.purchase_units[0].payments.captures[0].amount.value,
      };
      const payment = new Payment(data);
      await payment.save();
      res.redirect(
        `http://localhost:3000/payment-success?bookingID=${bookingID}`,
      );
    } catch (error) {
      console.error(
        'Error capturing order:',
        error.response ? error.response.data : error.message,
      );
      res.status(500).send(error);
    }
  }

  async paymentCancel(req, res) {
    console.log('Da huy booking');
    res.send('Payment cancelled');
  }

  //POST /paypal-success-getData
  async getData(req, res) {
    const bookingID = req.body.bookingID;
    try {
      const paymentData = await Payment.findOne({ bookingID });
      res.json(paymentData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  }
}

module.exports = new PaymentController();
