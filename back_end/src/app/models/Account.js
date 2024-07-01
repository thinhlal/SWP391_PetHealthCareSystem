const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    accountID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 255,
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
      enum: ['Customer', 'Doctor', 'Staff', 'Admin'],
      default: 'Customer',
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Account', AccountSchema);
