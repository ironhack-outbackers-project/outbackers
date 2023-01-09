const { Schema, model } = require('mongoose');

const serviceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String,
            enum: ['Job', 'Housing']
        },
        description: {
            type: String,
            required: true,
        },
        country: String,
        city: String,
        language: String,
        dateFrom: Date,
        dateTo: Date,
        image: {
            type: String,
            default: '../public/images/default-img.png',
        },
        creator: String
    },
    {
        timestamps: true
    }
);

module.exports = model('Service', serviceSchema);