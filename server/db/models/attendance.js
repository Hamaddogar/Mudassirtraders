const mongoose = require('mongoose');

module.exports = mongoose.model('Attendance', {
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"AppUser"
    },
    date: Number,
    month:Number,
    year:Number,
    time:String
});