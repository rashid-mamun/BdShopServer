const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
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
    date: {
        type: String,
        required: [true, 'Date is required'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        match: [/^\+?\d{10,15}$/, 'Invalid phone number'],
    },
    address: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
            message: 'Invalid status',
        },
        default: 'Pending',
    },
});

orderSchema.index({ email: 1 });

module.exports = mongoose.model('Order', orderSchema);