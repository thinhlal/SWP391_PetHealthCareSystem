const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkingSchema = new Schema(
  {
    workingID: {
      type: Number,
      unique: true,
    },
    doctorID: {
      type: String,
      required: true,
      maxlength: 8,
      ref: 'Doctor',
    },
    date: {
      type: Date,
      required: true,
    },
    isFulltime: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: String,
      default: null,
    },
    endTime: {
      type: String,
      default: null,
    },
    isOff: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('WorkingHour', WorkingSchema);
