var express = require('express');
var User = require('../models/user');
var async = require('async');

var router = express.Router();

function ignore_result(res, cb){
    cb();
}

router.get('/', function(req, res){
    // TODO: Mejorar esto.

    async.waterfall([
        User.register.bind(
            User,
            new User({username: "admin", is_admin: true, groups: ["admin"]}),            /* User Object */
            "admin"                                                                 /* password */
        ),
        ignore_result,
        User.register.bind(
            User,
            new User({username: "bootstrap", is_admin: false, groups: ["bootstrap"]}),   /* User Object */
            "bootstrap"                                                             /* password */
        ),
        ignore_result
    ], function(err){
        res.json(err);
    });
});

module.exports = router;