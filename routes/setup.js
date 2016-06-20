var express = require('express');
var User = require('../models/user');
var Group = require('../models/group');

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
            new User({username: "admin", is_admin: true, groups: ["admin"]}),            /* Group Object */
            "admin"                                                                 /* password */
        ),
        ignore_result,
        User.register.bind(
            User,
            new User({username: "bootstrap", is_admin: false, groups: ["bootstrap"]}),   /* Group Object */
            "bootstrap"                                                             /* password */
        ),
        ignore_result,
        Group.create.bind(
            Group,
            [new Group({groupname: 'admin'}),new Group({groupname: 'bootstrap'})]
        ),
        ignore_result
    ], function(err){
        res.json(err);
    });
});

module.exports = router;