let router = require("express").Router();
let api = require("../api/product");

router.post("/create", (req, res) => {
  api.createProduct(req.body, (err, product) => {
    product.populate('company category', () => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }

    });
  });
});

router.post("/toggleState", (req, res) => {
  api.toggleProduct(req.body, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(user);
    }
  });
});
router.delete("/delete/:id", (req, res) => {
  console.log(req.params)
  api.removeProduct(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});
module.exports = router;
