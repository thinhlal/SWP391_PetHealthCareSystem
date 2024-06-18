const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      maxlength: 25,
      default: 'Customer',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Customer', CustomerSchema);
