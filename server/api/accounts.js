let SupplierPayment = require('../db/models/supplierPayments');

const accounts = {
    addSupplierPayment(args, cb){

        let sPayment = new SupplierPayment(args);
        sPayment.save(cb);

    }
};