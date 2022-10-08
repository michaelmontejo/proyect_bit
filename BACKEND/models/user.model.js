const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        max: 50
    },

    apellido: {
        type: String,
        required: true,
        minlength: 4,
        max: 255
    },

    identificacion: {
        type: Number,
        required: false,
        minlength: 1,
        max: 99999999999
    },

    celular: {
        type: Number,
        required: true,
        minlength: 1,
        max: 99999999999
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);


