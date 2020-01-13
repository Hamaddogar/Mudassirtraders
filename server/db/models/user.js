const mongoose = require('mongoose');

module.exports = mongoose.model('AppUser', {
    fullName: String,
    code: String,
    email:String,
    areas:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Area"
    }],
    phone:String,
    salary:Number,
    status:Boolean
});