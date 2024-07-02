const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    rateID: {
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
    customerID: {
      type: String,
      required: true,
      ref: 'Customer',
    },
    date: {
      type: Date,
    },
    rate: {
      type: Number,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rate', RateSchema);
