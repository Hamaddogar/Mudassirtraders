const Product = require("../db/models/product");

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
    return Product.find(args)
    .populate("company")
      .exec(cb);
  },
  createProduct(data, cb) {
    if (data._id) {
      Product.findByIdAndUpdate(data._id, data, { new: true })
      .populate("company category")
        .exec(cb);
    } else {
      let newProduct = new Product(data).populate('company category').exec(cb);
      newProduct.save();
    }

    // let newProduct = new Product(data);
    // newProduct.save(cb)
  },
  removeProduct(id, cb) {
    return Product.findOneAndRemove(id, cb);
  },
  toggleProduct(args, cb) {
    return Product.findByIdAndUpdate(args._id, args, cb);
  }
};
