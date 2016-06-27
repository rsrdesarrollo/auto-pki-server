const express = require('express');
const policy = require('../../policies/policy');
const CertSignReq = require('../../models/cert_signin_req');

var router = express.Router();

router.get('/', function (req,res){
    CertSignReq.find({}).exec(function (err, result) {
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
    CertSignReq.findById(req.params.id).exec(function (err, result) {
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
    CertSignReq.find({}).exec(function (err, result) {
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

router.patch('/:id', function (req,res){
    var query = {
        $set: req.body.data.attributes
    };

    CertSignReq.findByIdAndUpdate(req.params.id, query,
        function(err, result){
            if(err) {
                res.json({
                    errors: [err.message]
                });
            }else{
                res.json({errors: []});
            }
        }
    );
});

module.exports = router;