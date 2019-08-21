const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "titleRequired"],
        minlength: [6, "tooShort"],
        unique: true
    },
    text: {
        type: String,
        required: [true, "textRequired"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Message', messageSchema);
