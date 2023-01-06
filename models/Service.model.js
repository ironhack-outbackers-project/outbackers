const { Schema, model } = require('mongoose');

const serviceSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        country: {
            type: String,
            required: true
        },
        language: [String],
        date: Date,
        serviceType: {
            type: String,
            enum: ['Job', 'Stay']
        },
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