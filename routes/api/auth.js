const express = require('express');
const jwt = require('jsonwebtoken');
const policy = require('../../policies/policy');

const User = require('../../models/user');

const config = require('../../conf').get_conf();

var router = express.Router();

/*
 Body(urlencode): username, password
 Response(json)
 */
router.post('/authenticate', function (req, res, next) {
    policy.authenticate('local', {session:false}, function (err, user, info) {
        if(err){ return next(err); }

        if(!user){
            res.status(401);
            return res.json({
                success: false,
                error: "Invalid user or password."
            })
        }else{
            var token = jwt.sign(user.getTokenInfo(), config.tokens.secret, {
                expiresIn: '2h',
                audience: config.tokens.audience,
                issuer: config.tokens.issuer
            });

            return res.json({
                success: true,
                result: {
                    id_token: token
                }
            });
        }


    })(req,res,next);
});


module.exports = router;