const Company = require('../db/models/company');


module.exports = {
    api_getAll(args) {

        var  args = args || {};

        return new Promise((c, e) => {

          this.get(args, function (err, companies) {

            if (err) {
                e(err);
            } else {

                 console.log(c(companies))
                c(companies);
            }

            });

        });

    },
    createCompany(data, cb) {

        if (data._id) {

            Company.findByIdAndUpdate(data._id, data,{new: true}).exec(cb);

        } else {

            let newCompany = new Company(data);
            newCompany.save(cb);
        }

    },
    get(args, cb) {

        return Company.find(args).populate('company').exec(cb);

    },
    removeCompany(id, cb) {

        return Company.findOneAndRemove({ id: id }, cb);

    },
    toggleCompany(args, cb) {

        return Company.findByIdAndUpdate(args._id, args, cb);

    }
}