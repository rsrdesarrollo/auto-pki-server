const express = require('express');
const jwt = require('jsonwebtoken');
const policy = require('../../policies/policy');

const HttpStatus = require('http-status-codes');

const User = require('../../models/user');

const config = require('../../conf').get_conf();

var router = express.Router();

function generate_user_token(user){
    return jwt.sign(user.getTokenInfo(), config.tokens.secret, {
        expiresIn: '2h',
        audience: config.tokens.audience,
        issuer: config.tokens.issuer
    });
}

router.post('/authenticate', function (req, res, next) {
    policy.authenticate('local', function (err, user, info) {
        if(err){ return next(err); }

        req.session.authenticated = true;

        if(!user){
            res.status(HttpStatus.UNAUTHORIZED);
            return res.json({
                success: false,
                error: "Invalid user or password."
            });
        }else if(user.need_2f){
            res.status(HttpStatus.UNAUTHORIZED);
            return res.json({
                success: false,
                needs_2f: true,
                error: "User needs to supply OTP"
            });
        }else{
            return res.json({
                success: true,
                result: {
                    id_token: generate_user_token(user)
                }
            });
        }


    })(req,res,next);
});

router.post('/validate-otp',
    policy.authenticate('totp'),
    function (req, res, next) {

        req.session.destroy();

        return res.json({
            success: true,
            result: {
                id_token: generate_user_token(user)
            }
        });
    }
);

router.post('/activate-otp',
    policy.authenticate('jwt', { session: false }),
    policy.authenticate('totp', { session: false }),
    function (req, res, next) {
        req.user.needs_2f = true;
        req.user.save(function (err) {
            if(err){
                res.json({
                    errors: [err.message]
                });
            }else{
                res.json({success: true});
            }
        })
    }
);

router.post('/deactivate-otp',
    policy.authenticate('jwt', { session: false }),
    function (req, res, next) {
        req.user.needs_2f = false;
        req.user.save(function (err) {
            if(err){
                res.json({
                    errors: [err.message]
                });
            }else{
                res.json({success: true});
            }
        })
    }
);

module.exports = router;