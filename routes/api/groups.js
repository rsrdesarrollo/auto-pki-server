const express = require('express');
const policy = require('../../policies/policy');
const Group = require('../../models/group');

var router = express.Router();

router.get('/', function (req,res){
    Group.find({}).exec(function (err, result) {
        if(err){
            return res.json({
                errors: [err]
            });
        }

        res.json({
            data: result.map(it => it.toJSON())
        })

    });
});

router.get('/:id', function (req,res){
    Group.findById(req.params.id).exec(function (err, result) {
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
            data: result.toJSON()
        })

    });
});

router.post('/', function (req,res){
    Group.find({}).exec(function (err, result) {
        if(err){
            return res.json({
                errors: [err]
            });
        }

        res.json({
            data: result.map(it => it.toJSON())
        })

    });
});

module.exports = router;