let router = require("express").Router();
let api = require("../api/supplier");
// const supplier = require('../db/models/supplier');

router.post("/create", (req, res) => {
  //   console.log("Suppler", req.body);
  api.createSupplier(req.body, (err, supplier) => {
    // supplier.populate('company', () => {

    if (err) {
      res.status(500).json(err);
    } else {
        console.log(supplier)
      res.json(supplier);
    }

    // });
  });
});
router.delete("/delete:id", (req, res) => {
  // console.log(req.params)
api.removeSupplier(req.params.id, (err, supplier) => {
  // customer.populate('company area',(err, customer) => {

  if (err) {
    res.status(500).json(err);
  } else {
    res.json(supplier);
  }

  // })
});
});
module.exports = router;
