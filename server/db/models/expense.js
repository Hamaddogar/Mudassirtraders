const mongoose = require('mongoose');

module.exports = mongoose.model('Expense', {
    date: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    notes: String,
    code:String
});