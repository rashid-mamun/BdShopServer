const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },
    description: String,
    star: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = reviewSchema;