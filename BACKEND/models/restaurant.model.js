const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    plato_entrada: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    plato_fuerte: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    postre: {
        type: String,
        required: true,
        minlength: 6,
        max: 50
    },

    valor: {
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

module.exports = mongoose.model('restaurant', restaurantSchema);


