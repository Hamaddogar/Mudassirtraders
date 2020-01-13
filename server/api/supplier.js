const Supplier = require("../db/models/supplier");

module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, products) {
        if (err) {
          e(err);
        } else {
          c(products);
        }
      });
    });
  },
  get(args, cb) {
    return Supplier.find(args)
      .populate("company")
      .exec(cb);
  },
  createSupplier(data,cb) {
    console.log("Data", data);
    if (data._id) {
      Supplier.findByIdAndUpdate(data._id, data, { new: true })
        .populate("company")
        .exec(cb);
    } else {
      let item = new Supplier(data);
      item.save(cb);
    }

    // let newSupplier = new Supplier(data);
    // newSupplier.save(cb)
  },
  removeSupplier(id, cb) {
    return Supplier.findOneAndRemove(id, cb);
  },
  toggleSupplier(args, cb) {
    return Supplier.findByIdAndUpdate(args, cb);
  }
};
