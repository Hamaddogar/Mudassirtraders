const mongoose = require('mongoose');

module.exports = mongoose.model('Supplier', {
    address: String,
    agency: String,
    code: String,
    comments: String,
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company'
    },
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    supplierGender: String,
    supplierProvince: String,
    zip: String,
    status:Boolean
});
