let router = require("express").Router();
let api = require("../api/sale");

router.post("/create", (req, res) => {
  // req.body.customer = req.body.customer.id;

  api.createSale(req.body, (err, sale) => {
    
    sale.populate("area customer company", (err, sale) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(sale);
      }
    });
  });
});
router.delete("/delete/:id", (req, res) => {
  console.log(req.params)
  api.deleteSale(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});
router.post("/toggleStatus", (req, res) => {
  console.log(req.body)
  api.createSale(req.body, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
