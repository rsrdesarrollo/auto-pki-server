const express = require('express');
const policy = require('../../policies/policy');
const User = require('../../models/user');

var router = express.Router();

router.get('/', policy.authenticate('jwt', { session: false}), policy.only_admins,
    function (req,res){
        
        User.find({}).exec(function (err, result) {
            if(err){
                return res.json({
                    errors: [err]
                });
            }

            res.json({
                data: result.map(it => it.toJSON())
            })

        });
    }
);

router.get('/:id', policy.authenticate('jwt', { session: false}), policy.only_admins,
    function (req,res){
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
                data: result.toJSON()
            })

        });
    }
);

router.post('/', policy.authenticate('jwt', { session: false}), policy.only_admins,
    function (req,res){
        User.find({}).exec(function (err, result) {
            if(err){
                return res.json({
                    errors: [err]
                });
            }

            res.json({
                data: result.map(it => it.toJSON())
            })

        });
    }
);

module.exports = router;