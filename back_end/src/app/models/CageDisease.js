const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CageDiseaseSchema = new Schema(
  {
    cageDiseaseID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    cageID: {
      type: Number,
      required: true,
      ref: 'Cage',
    },
    bookingID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Booking',
    },
    petID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Pet',
    },
    doctorID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Doctor',
    },
    startDate: {
      type: Date,
      required: true,
    },
    dischargeDate: {
      type: Date,
      default: null,
    },
    reasonForAdmission: {
      type: String,
      required: true,
    },
    isRecover: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CageDisease', CageDiseaseSchema);
