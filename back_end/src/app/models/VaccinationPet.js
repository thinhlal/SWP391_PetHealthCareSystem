const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinationPetSchema = new Schema(
  {
    vaccinationPetID: {
      type: Number,
      unique: true,
    },
    vaccinationID: {
      type: Number,
      required: true,
      ref: 'Vaccination',
    },
    bookingID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Booking',
    },
    medicalReportID: {
      type: Number,
      ref: 'MedicalReport',
    },
    petID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Pet',
    },
    dateGiven: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('VaccinationPet', VaccinationPetSchema);
