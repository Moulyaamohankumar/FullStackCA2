const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
    },
});

const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;