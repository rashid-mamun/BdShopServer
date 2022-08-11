const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({


    title: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: String,
        required: true,
    },
    catagory: {
        type: String
    }
});

module.exports = blogSchema;