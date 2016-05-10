const express = require('express');
const policy = require('../../policies/policy');
const CertSignReq = require('../../models/cert_signin_req');

var router = express.Router();

function build_query_from_request(body){
    var query = {
        is_removed: false,
        is_approved: false
    };

    return query;
}

router.post('/search',
    policy.authenticate('jwt', {session: false}),
    function (req, res, next) {
        var query = build_query_from_request(req.body);

        var opts = {
            limit: req.body.limit || 20,
            skip: req.body.skip || 0
        };

        CertSignReq
            .find(query)
            .limit(opts.limit)
            .skip(opts.skip)
            .exec(function(err, results){
                if(err){
                    return res.json({
                        success: false,
                        error: err.message
                    });
                }

                res.json({
                    success: true,
                    result: results
                });
        });
    }
);

router.post('/authorize',
    policy.authenticate('jwt', {session: false}),
    function (req, res, next) {

        if(! "admin" in req.user.groups){
            return res.json({
                success: false,
                error: "Not Authorized to do this job."
            });
        }

        var client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        var query = {
            _id: { $in: req.body.ids },
            is_removed: false,
            is_approved:false
        };

        var update = {
            $set: {
                is_approved: true,
                auth_user: req.user.username,
                auth_date: new Date(),
                auth_ip: client_ip
            }
        };

        var options = {
            multi: true
        };

        CertSignReq.update(query,update, options, function(err, resp){
            if(err){
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                result: resp
            });
        })
    }
);

router.post('/delete',
    policy.authenticate('jwt', {session: false}),
    function (req, res, next) {

        if(! "admin" in req.user.groups){
            return res.json({
                success: false,
                error: "Not Authorized to do this job."
            });
        }

        var client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        var query = {
            _id: { $in: req.body.ids },
            is_removed: false,
            is_approved:false
        };
        var update = {
            $set: {
                is_removed: true,
                auth_user: req.user.username,
                auth_date: new Date(),
                auth_ip: client_ip
            }
        };

        var options = {
            multi: true
        };

        CertSignReq.update(query,update, options, function(err, resp){
            if(err){
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                result: resp
            });
        })
    }
);


module.exports = router;