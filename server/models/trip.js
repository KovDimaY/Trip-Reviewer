const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true,
        minlength: 150
    },
    duration: {
        type: Number,
        default: 1,
        min: 1,
        max: 365
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    ownerId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };