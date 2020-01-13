let router = require("express").Router();
let api = require("../api/customer");

router.post("/create", (req, res) => {
  api.createCustomer(req.body, (err, customer) => {
    customer.populate('company area ',(err, customer) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(customer);
    }

    })
  });
});
router.delete("/deleteCustomer:id", (req, res) => {
    // console.log(req.params)
  api.removeCustomer(req.params.id, (err, customer) => {
    // customer.populate('company area',(err, customer) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(customer);
    }

    // })
  });
});

module.exports = router;
