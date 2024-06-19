const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceBookingVetSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        bookingID: {
            type: String,
            required: true,
            ref: 'Booking',
        },
        serviceID: {
            type: String,
            required: true,
            ref: 'Service',
        },
        vetID: {
            type: String,
            required: true,
            ref: 'Doctor',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ServiceBookingVet', ServiceBookingVetSchema);
