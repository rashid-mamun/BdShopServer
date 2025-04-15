const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
    date: {
        type: String,
        required: [true, 'Date is required'],
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
});

blogSchema.index({ title: 1 });

module.exports = mongoose.model('Blog', blogSchema);