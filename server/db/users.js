let mongoose = require('mongoose');
let LocalURI = "mongodb://localhost:27017/stock"
let URI = 'mongodb+srv://Muhammad:Muhammad@cluster0-oset3.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect('mongodb+srv://adeel123:adeel123@devconnector-pdmbx.mongodb.net/Ecomuser',{ useNewUrlParser: true , useCreateIndex:true},function(err,data){
mongoose.connect(LocalURI, { useNewUrlParser: true }, (err, data) => {
    console.log(err || data)
    console.log('mongodb connected');
})
let userSchema = mongoose.Schema({
    // username:{
    //     type:String,
    //     require: true,
    //     unique:true
    // },
    email: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }

})
let User = mongoose.model('user', userSchema);

let u1 = new User();
u1.email = "mudassirtrdrs@gmail.com";
u1.number = "1";
u1.password = "12345";

u1.save();

module.exports = User;