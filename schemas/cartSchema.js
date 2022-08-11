const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    config: {
        type: String
    },

});

module.exports = cartSchema;