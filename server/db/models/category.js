const mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
    name: String,
    code: String,
    lastUpdated: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
});