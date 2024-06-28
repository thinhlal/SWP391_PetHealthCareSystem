const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    adminID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
    },
    accountID: {
      type: String,
      required: true,
      maxlength: 8,
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

module.exports = mongoose.model('Admin', AdminSchema);
