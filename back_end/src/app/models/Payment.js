const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    paymentID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    bookingID: {
      type: String,
      required: true,
      ref: 'Booking',
    },
    date: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      require: true,
      enum: ['PAYPAL', 'COUNTER'],
    },
    isCancelPayment: {
      type: Boolean,
      default: false,
    },
    idPaymentPaypal: {
      type: String,
      default: null,
    },
    captureID: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Payment', PaymentSchema);
