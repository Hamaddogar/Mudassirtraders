const Category = require('../db/models/category');

module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, categories) {

                if (err) {
                    e(err);
                } else {
                    c(categories);
                }

            });

        });

    },
    get(args, cb) {

        return Category.find(args, cb);

    },
    createCategory(data, cb) {

        if (data._id) {

            data.lastUpdated = new Date()
            Category.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);

        } else {


            let newCategory = new Category(data);
            // data.lastUpdated = new Date();
            newCategory.save(cb)

        }

        // let newCategory = new Category(data);
        // data.lastUpdated = new Date();
        // newCategory.save(cb)

    },
    removeCategory(id, cb) {

        return Category.findOneAndRemove( id, cb);

    },
    toggleCategory(args, cb) {

        return Category.findByIdAndUpdate(args._id, args, cb);

    }
}