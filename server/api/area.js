const Area = require('../db/models/area');

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
    get(args, cb) {

        return Area.find(args, cb);

    },
    createArea(data, cb) {

        if (data._id) {

            data.lastUpdated = new Date()
            Area.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);

        } else {


            let newArea = new Area(data);
            // newArea.lastUpdated = new Date().toDateString;
            newArea.save(cb);

        }


    },
    deleteArea(id, cb) {

        return Area.findOneAndRemove(id, cb);

    },
    toggleArea(args, cb) {

        return Area.findByIdAndUpdate(args._id, args, cb);

    }
}