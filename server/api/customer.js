const Customer = require('../db/models/customer');


module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, customers) {

                if (err) {
                    e(err);
                } else {
                    c(customers);
                }

            });

        });

    },
    get(args, cb) {

        return Customer.find(args).populate('company area').exec(cb);

    },
    createCustomer(data, cb) {

        if (data._id) {

            Customer.findByIdAndUpdate(data._id, data,{new: true}).populate('company area').exec(cb);

        } else {

            let newCustomer = new Customer(data);
            newCustomer.save(cb);
        }

    },
    removeCustomer(id, cb) {

        return Customer.findByIdAndRemove(id, cb);

    },
    toggleCustomer(args, cb) {

        return Customer.findByIdAndUpdate(args._id, args, cb);

    }
};