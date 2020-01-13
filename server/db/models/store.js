const mongoose = require('mongoose');

module.exports = mongoose.model('Store', {
    address: String,
    name: String,
    email: String,
    phone: String,   
    password: String,
    startTiming:String,
    endingTiming:String,
    offdays:[]
});
