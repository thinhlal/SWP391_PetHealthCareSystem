const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            maxlength: 8,
            unique: true,
        },
        customerID: {
            type: String,
            required: true,
            ref: 'Account',
        },
        name: {
            type: String,
            required: true,
            maxlength: 50,
        },
        birthday: { 
            type: Date,
            required: true
        },
        petType: {
            type: String,
            enum: ['dog', 'cat'],
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Pet', PetSchema);
