const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "usernameRequired"],
        maxlength: [32, "tooLong"],
        minlength: [6, "tooShort"],
        match: [/^[A-Za-z0-9]+$/, "usernameIncorrect"],
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        maxlength: [32, "tooLong"],
        minlength: [8, "tooShort"],
        match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        required: [true, "passwordRequired"]
    },
    firstName: String,
    lastName: String,
    age: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);