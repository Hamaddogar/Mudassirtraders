const mongoose = require('mongoose');

module.exports = mongoose.model('Salary', {
    user: {
        type:mongoose.SchemaTypes.ObjectId
    },
    date: {
        type:Date,
        default:Date.now
    },    
    month:String,
    type:String,
    amount: Number
});