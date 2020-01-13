let router = require('express').Router();
let api = require('../api/category'); 

router.post('/create', (req, res)=>{

    api.createCategory(req.body,(err, category)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(category);
        }

    });

})
router.delete("/delete/:id", (req, res) => {
    console.log(req.params)
    api.removeCategory(req.params.id, (err, category) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(category);
      }
    });
  });
router.post('/toggleState', (req, res)=>{

    api.toggleCategory(req.body,(err, category)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(category);
        }

    });

})


module.exports = router;