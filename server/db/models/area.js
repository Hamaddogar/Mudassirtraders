const mongoose = require('mongoose');

module.exports = mongoose.model('Area', {
    name: String,
    code: String,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
});