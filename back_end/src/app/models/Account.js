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
      enum: ['Customer', 'Veterinarian', 'Staff', 'Admin'],
      default: 'Customer',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Account', AccountSchema);
