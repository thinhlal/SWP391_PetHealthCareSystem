const axios = require('axios');
const Payment = require('../models/Payment.js');
const { getAccessToken, PAYPAL_API } = require('../../config/paypal/paypal.js');
const Booking = require('../models/Booking.js');

class PaypalController {
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
          cancel_url: `http://localhost:5000/paypal/paypal-cancel?bookingID=${req.body.bookingID}`,
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

    await Payment.findOneAndUpdate(
      { bookingID: req.body.bookingID },
      { idPaymentPaypal: response.data.id },
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
      const captureID = response.data.purchase_units[0].payments.captures[0].id;
      const bookingID =
        response.data.purchase_units[0].payments.captures[0].custom_id;
      const paymentUpdate = await Payment.findOneAndUpdate(
        { bookingID: bookingID },
        {
          isSuccess: true,
          date: new Date(),
          captureID: captureID,
        },
        { new: true, runValidators: true },
      );

      if (!paymentUpdate) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      res.redirect(
        `http://localhost:3000/payment?bookingID=${bookingID}&status=success`,
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
    try {
      const { bookingID } = req.query;

      const updateCancelPayment = await Payment.findOneAndUpdate(
        { bookingID: bookingID },
        {
          isCancelPayment: true,
          isSuccess: false,
        },
        { new: true, runValidators: true },
      );

      if (!updateCancelPayment) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.redirect(
        `http://localhost:3000/payment?bookingID=${bookingID}&status=cancel`,
      );
    } catch (error) {
      console.error(
        'Error canceling order:',
        error.response ? error.response.data : error.message,
      );
      res.status(500).send(error);
    }
  }

  //POST /paypal-success-getData
  async getData(req, res) {
    const bookingID = req.body.bookingID;
    try {
      const paymentData = await Payment.aggregate([
        { $match: { bookingID } },
        {
          $lookup: {
            from: 'bookings',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'bookingDetails',
          },
        },
        {
          $lookup: {
            from: 'servicebookingvets',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'serviceBookingVetsDetails',
          },
        },
        {
          $lookup: {
            from: 'services',
            localField: 'serviceBookingVetsDetails.serviceID',
            foreignField: 'serviceID',
            as: 'serviceDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'bookingDetails.doctorID',
            foreignField: 'doctorID',
            as: 'doctorsDetails',
          },
        },
      ]);
      res.status(200).json({ paymentData });
    } catch (error) {
      console.error('Error fetching payment data:', error);
      res.status(500).json({ message: 'Error fetching payment data', error });
    }
  }

  //POST /refundPaymentBooking
  async refundPaymentBooking(req, res) {
    const { bookingID } = req.body;
    try {
      const booking = await Booking.findOne({ bookingID });
      const payment = await Payment.findOne({ bookingID });
      const daysBefore =
        (booking.dateBook - booking.dateCancelBook) / (1000 * 60 * 60 * 24);
      let refundAmount = payment.totalPrice;
      if (daysBefore < 3) {
        refundAmount = 0;
      } else if (daysBefore < 7) {
        refundAmount = payment.totalPrice * 0.75;
      }

      if (refundAmount <= 0 || refundAmount > payment.amount) {
        return res.status(204).send();
      }

      const accessToken = await getAccessToken();

      const response = await axios.post(
        `${process.env.PAYPAL_BASE_URL}/v2/payments/captures/${payment.captureID}/refund`,
        {
          amount: {
            value: refundAmount.toFixed(2),
            currency_code: 'USD',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 201 || response.status === 200) {
        booking.isRefund = true;
        booking.refundPrice = refundAmount;
        await booking.save();
        res.send('Booking cancelled and refund processed');
      } else {
        res.status(500).send('Failed to process refund');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}

module.exports = new PaypalController();
