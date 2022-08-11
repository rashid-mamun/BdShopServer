const mongoose = require('mongoose');


const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    config: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    madeIn: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
});

module.exports = serviceSchema;