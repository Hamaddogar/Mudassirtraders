const mongoose = require('mongoose');

module.exports = mongoose.model('Customer', {
    city: String,
    province: String,
    address: String,
    code: String,
    comments:String,
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company'
    },
    area: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Area'
    },
    companyName: String,
    email: String,
    firstName: String,
    gender: String,
    lastName: String,
    phone: String,
    zip: String,
    status:Boolean
});

// export default Customer;