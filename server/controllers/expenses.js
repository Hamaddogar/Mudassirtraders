let router = require('express').Router();
let api = require('../api/expense'); 

router.post('/create', (req, res)=>{

    api.createExpense(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

});

router.get('/all', (req, res)=>{

    api.get(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

})

router.post('/toggleState', (req, res)=>{

    api.toggleCompany(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

})


module.exports = router;