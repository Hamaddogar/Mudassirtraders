let router = require('express').Router();
let api = require('../api/store'); 

router.post('/update', (req, res)=>{

    api.createStore(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

});

router.get('/get', (req, res)=>{

    api.get((err, store)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(store);
        }

    });

})


module.exports = router;