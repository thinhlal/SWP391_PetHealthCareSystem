const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseInfoSchema = new Schema(
    {
        diseaseInfoID: {
            type: Number,
            required: true,
            unique: true,
        },
        cageDiseaseID: {
            type: String,
            required: true,
            maxlength: 8,
            ref: 'CageDisease',
        },
        date: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('DiseaseInfo', DiseaseInfoSchema);
