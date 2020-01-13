const Sale = require("../db/models/sale");

module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, sales) {
        if (err) {
          e(err);
        } else {
          c(sales);
        }
      });
    });
  },
  get(args, cb) {
    return Sale.find(args)
      .populate("area  customer")
      .exec(cb);
  },
  createSale(data, cb) {

    if (data._id) {
      Sale.findByIdAndUpdate(data._id, data, { new: true })
        .populate("area customer")
        .exec(cb);
    } else {
      let newSale = new Sale(data);
      data.lastUpdated = new Date();
      newSale.save(cb);
    }
  },
  deleteSale(id, cb) {
    return Sale.findOneAndDelete(id, cb);
  }
};
