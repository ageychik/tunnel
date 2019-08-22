const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "User Name is Required."],
        maxlength: [32, "User Name too Long."],
        minlength: [6, "User Name too Short."],
        match: [/^[A-Za-z0-9]+$/, "User Name incorrect."]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email incorrect.']
    },
    password: {
        type: String,
        required: [true, "Password is Required."]
    },

    status: {
        type: Number,
        required: [true, "Status is required, [GUEST: 1] by default"]
    },
    firstName: String,
    lastName: String,
    age: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);