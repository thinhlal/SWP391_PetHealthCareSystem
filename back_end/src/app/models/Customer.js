const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    customerID: {
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
      default: null,
      maxlength: 50,
    },
    phone: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: 'http://bootdey.com/img/Content/avatar/avatar1.png',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Customer', CustomerSchema);
