const { Schema, model } = require('mongoose');

const serviceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        serviceType: String,
        description: {
            type: String,
            required: true,
        },
        country: String,
        city: String,
        language: [String],
        date: String,
        image: {
            type: String,
            default: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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