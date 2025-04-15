const mongoose = require('mongoose');

const ourTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('OurTeam', ourTeamSchema);