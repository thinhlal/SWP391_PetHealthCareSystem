const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    staffID: {
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

module.exports = mongoose.model('Staff', StaffSchema);
