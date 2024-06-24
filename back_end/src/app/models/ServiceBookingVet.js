const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceBookingVetSchema = new Schema(
  {
    serviceBookingVetID: {
      type: Number,
      unique: true,
    },
    bookingID: {
      type: String,
      required: true,
      ref: 'Booking',
    },
    serviceID: {
      type: String,
      required: true,
      ref: 'Service',
    },
    doctorID: {
      type: String,
      ref: 'Doctor',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ServiceBookingVet', ServiceBookingVetSchema);
