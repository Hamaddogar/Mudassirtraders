const User = require('../db/models/user');
const Salary = require('../db/models/salaries');

// setTimeout(()=>{

//     User.remove();

// }, 3000)


module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, products) {

                if (err) {
                    e(err);
                } else {
                    c(products);
                }

            });

        });

    },
    salary: {

        get(args, cb) {

            return Salary.find(args).populate('areas').exec(cb);

        }

    },
    get(args, cb) {

        // User.remove({},()=>{

        return User.find(args).populate('areas').exec(cb);
        // })


    },
    createSalary(args, cb) {

        let newSlary = new Salary(args);
        newSlary.save(cb);


    },
    createUser(data, cb) {

        if (data._id) {

            User.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);

        } else {

            let newUser = new User(data);
            // data.lastUpdated = new Date();
            newUser.save(cb)

        }



    },
    removeUser(id, cb) {

        return User.findOneAndRemove(id, cb);

    },
    toggleUser(args, cb) {

        return User.findByIdAndUpdate(args, cb);

    }
}