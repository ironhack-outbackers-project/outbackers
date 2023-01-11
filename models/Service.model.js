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
            default: 'https://as2.ftcdn.net/v2/jpg/02/54/55/77/1000_F_254557722_4bmBGPcKz6pniGAUcCumA3j8PMTBRgbM.jpg',
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