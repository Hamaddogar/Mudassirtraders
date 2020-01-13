const Store = require('../db/models/store');

module.exports = {
    get(cb) {

        return new Promise((c, e)=>{

            Store.findOne().exec((err, store)=>{
                    err ? e(err) : c(store);
            });

        })

    },
    createStore(args, cb) {

        return new Promise((c, e) => {

            if (args._id) {

                Store.findByIdAndUpdate(args._id, args, {new: true}, cb);

            } else {
                let newStore = new Store(args);
                newStore.save(cb);
            }


        });

    }
};
