let router = require('express').Router();
let api = require('../api/attendance'); 


router.post('/get', (req, res)=>{
    
    
    api.get(req.body,(err, attendance)=>{

        if(err){
            res.status(500).json(err);
        }else{
            res.json(attendance);
        }

    })

});

router.post('/create', (req, res)=>{

    api.markAttendance(req.body,(err, product)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(product);
        }

    });

})



module.exports = router;