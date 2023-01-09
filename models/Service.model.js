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
        language: [String],
        dateFrom: Date,
        dateTo: Date,
        image: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/834/834096.png',
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Service', serviceSchema);