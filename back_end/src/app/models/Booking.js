const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    bookingID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    accountID: {
      type: String,
      required: true,
      ref: 'Account',
    },
    petID: {
      type: String,
      required: true,
      ref: 'Pet',
    },
    doctorID: {
      type: String,
      ref: 'Doctor',
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateBook: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    dateCancelBook: {
      type: Date,
      default: null,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    isCheckIn: {
      type: Boolean,
      default: false,
    },
    isPrepayment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Booking', BookingSchema);
