const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    star: {
        type: Number,
        required: [true, 'Star rating is required'],
        enum: {
            values: [1, 2, 3, 4, 5],
            message: 'Star rating must be between 1 and 5',
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

reviewSchema.index({ email: 1 });

module.exports = mongoose.model('Review', reviewSchema);