const mongoose = require('mongoose');

let CarSchema = mongoose.Schema({
    model: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,

    },
    registration: {
        type: String,
        required: true,

    }
});

module.exports = mongoose.model('Cars', CarSchema);