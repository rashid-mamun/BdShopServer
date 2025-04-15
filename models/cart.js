const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, 'Item ID is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    config: {
        type: String,
        trim: true,
    },
});

cartSchema.index({ email: 1 });

module.exports = mongoose.model('Cart', cartSchema);