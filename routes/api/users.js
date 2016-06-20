const express = require('express');
const policy = require('../../policies/policy');
const User = require('../../models/user');

var router = express.Router();

router.get('/', function (req,res){
    User.find({}).exec(function (err, result) {
        if(err){
            return res.json({
                errors: [err]
            });
        }

        res.json({
            users: result.map(it => it.toJSON())
        })

    });
});

router.get('/:id', function (req,res){
    User.findById(req.params.id).exec(function (err, result) {
        if(err){
            return res.json({
                errors: [err]
            });
        }else if(! result){
            return res.json({
                errors: ["Not found"]
            });
        }

        res.json({
            user: result.toJSON()
        })

    });
});

router.post('/', function (req,res){
    User.find({}).exec(function (err, result) {
        if(err){
            return res.json({
                errors: [err]
            });
        }

        res.json({
            users: result.map(it => it.toJSON())
        })

    });
});

module.exports = router;