const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },


    price: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    message: String,
    status: {
        type: String,
        required: true,

    }
});

module.exports = orderSchema;