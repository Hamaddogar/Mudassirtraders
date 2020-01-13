let router = require('express').Router();
let api = require('../api/user');
let mongoose = require('mongoose');

router.get('/salary/get', (req, res) => {

    api.salary.get({ user: req.query.id }, (err, record) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(record);
        }

    });

})
router.delete('/del:id', (req, res) => {

    api.removeUser( req.params.id , (err, record) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(record);
        }

    });

})

router.post('/salary/create', (req, res) => {

    api.createSalary(req.body, (err, salary) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(salary);
        }

    })

})
router.post('/create', (req, res) => {

    api.createUser(req.body, (err, user) => {

        user.populate('areas', (err, user) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(user);
            }

        })



    });

})

router.post('/toggleState', (req, res) => {

    api.createUser(req.body, (err, user) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(user);
        }

    });

})


module.exports = router;