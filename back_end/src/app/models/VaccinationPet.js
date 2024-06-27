const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinationPetSchema = new Schema(
  {
    vaccinationID: {
      type: Number,
      unique: true,
      ref: 'Vaccination',
    },
    petID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
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
