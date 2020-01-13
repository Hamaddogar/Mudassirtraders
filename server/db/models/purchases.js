const mongoose = require('mongoose');

module.exports = mongoose.model('Purchase', {
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Supplier"
    },
    payments: Array,
    total:Number,
    discount:Number,
    billNo:Number,
    deliveryDate:Date,
    bills:Array,
    billDiscount:Number

});


// this.state = {
//     deleteDialog: false,
//     customer: { id: 0 },
//     payments: [],       
//     area: {},
//     bills: [
//         this.putNewOrder()
//     ]
// }