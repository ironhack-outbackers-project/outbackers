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
            default: 'https://images.unsplash.com/photo-1568444438385-ece31a33ce78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            message: String,
            creator: {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
            username: String
            }]
    },
    {
        timestamps: true
    }
);

module.exports = model('Service', serviceSchema);