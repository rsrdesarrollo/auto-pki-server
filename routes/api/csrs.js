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
            csrs: result.map(it => it.toJSON())
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
            csr: result.toJSON()
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
            csrs: result.map(it => it.toJSON())
        })

    });
});

module.exports = router;