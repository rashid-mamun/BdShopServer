const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    config: {
        type: String,
        required: [true, 'Config is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    madeIn: {
        type: String,
        required: [true, 'MadeIn is required'],
        trim: true,
    },
    date: {
        type: String,
        trim: true,
    },
});

serviceSchema.index({ category: 1 });

module.exports = mongoose.model('Service', serviceSchema);