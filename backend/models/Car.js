const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({


    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('cars', CarSchema);