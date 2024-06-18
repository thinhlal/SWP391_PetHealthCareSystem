const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema(
    {
        customerID: {
            type: String,
            required: true,
            ref: 'Customer',
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
            default: 'Customer',
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
)

