const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    doctorID: {
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
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/pethealthcare-c3707.appspot.com/o/services%2F1722167230864_portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?alt=media&token=bfc55c34-9ffa-4d8d-be3e-5774ac8275f8',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Doctor', DoctorSchema);
