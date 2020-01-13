const mongoose = require('mongoose');

const SupplierPayments = mongoose.model('SupplierPayments', {
    totalPayable: Number,
    amountPaid: String,
    date: Date,
    supplierID: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Supplier'
    },
});

export default SupplierPayments;