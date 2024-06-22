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
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Payment', PaymentSchema);
