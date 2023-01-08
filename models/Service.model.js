const { Schema, model } = require('mongoose');

const serviceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        country: String,
        city: String,
        language: [String],
        dateFrom: Date,
        dateTo: Date,
        serviceType: {
            type: String,
            enum: ['Job', 'Housing']
        },
        image: {
            type: String,
            default: '../public/images/default-img.png',
        },
        creator: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Service', serviceSchema);