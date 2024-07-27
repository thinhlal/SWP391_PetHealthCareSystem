const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    serviceID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    type: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat', 'Both'],
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Service', ServiceSchema);
