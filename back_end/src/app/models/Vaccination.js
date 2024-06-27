const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinationSchema = new Schema(
    {
        vaccinationID: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            require: true,
            default: 0,
        },
        status:{
            type: Boolean,
            require: true,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Vaccination', VaccinationSchema);
