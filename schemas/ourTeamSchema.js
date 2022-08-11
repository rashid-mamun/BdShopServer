const mongoose = require('mongoose');


const ourTeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    url: String,
    position: String,

});

module.exports = ourTeamSchema;