const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    doctorID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    accountID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
      ref: 'Account',
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Doctor', DoctorSchema);
