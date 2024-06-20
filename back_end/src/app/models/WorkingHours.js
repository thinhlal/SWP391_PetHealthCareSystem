const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkingSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    vet_ID: {
      type: String,
      required: true,
      maxlength: 8,
      unique: true,
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
      required: true,
    },
    endTime: {
      type: String,
      required: true,
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
