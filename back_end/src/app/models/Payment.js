const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    bookingID: {
      type: String,
      required: true,
      ref: 'Account',
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Payment', PaymentSchema);
