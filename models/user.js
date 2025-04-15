const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        unique: true,
    },
    displayName: {
        type: String,
        required: [true, 'Display name is required'],
        trim: true,
        minlength: [2, 'Display name must be at least 2 characters'],
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true,
    },
    division: {
        type: String,
        required: [true, 'Division is required'],
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Invalid role',
        },
        default: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);