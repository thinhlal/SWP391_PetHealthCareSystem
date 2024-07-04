const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalReportSchema = new Schema(
  {
    medicalReportID: {
      type: Number,
      unique: true,
    },
    accountID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Account',
    },
    petID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Pet',
    },
    bookingID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Booking',
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);
