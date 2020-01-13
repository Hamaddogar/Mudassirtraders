const mongoose = require('mongoose');

module.exports = mongoose.model('Company', {
    code: String,
    name: String,    
    phone: String,
    address: String,
    status:{ type: Boolean, default: true }
});