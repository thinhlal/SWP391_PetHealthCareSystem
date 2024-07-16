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
      default: null,
    },
    phone: {
      type: Number,
      required: true,
      default: null,
    },
    email: {
      type: String,
      default: null,
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
    isRate: {
      type: Boolean,
      default: false,
    },
    isRefund: {
      type: Boolean,
      default: false,
    },
    refundPrice: {
      type: Number,
      default: 0,
    },
    isCheckedVaccinate: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Booking', BookingSchema);
