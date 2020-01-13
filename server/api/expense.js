const Expense = require('../db/models/expense');

module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, expenses) {

                if (err) {
                    e(err);
                } else {
                    c(expenses);
                }

            });

        });

    },
    createExpense(data, cb) {

        if (data._id) {

            Expense.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);

        } else {

            let newExpense = new Expense(data);
            newExpense.save(cb);
        }

    },
    get(args, cb) {

        return Expense.find(args).exec(cb);

    }    
}