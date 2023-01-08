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
        city: String,
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
        creator: {
            type: String,
            required: [true, 'Your name is required'],
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Service', serviceSchema);