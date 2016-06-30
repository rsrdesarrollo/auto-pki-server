var express = require('express');
var User = require('../models/user');
var Group = require('../models/group');

var async = require('async');

var router = express.Router();

function model_wraps_errors(modelObj, modelFunc){
    var args = Array.prototype.slice.call(arguments, 2);
    return function(cb){
        args.push(
            function (err, res) {
                cb(null, {error:err, result:res});
            }
        );
        modelObj[modelFunc].apply(modelObj, args);
    }
}

module.exports = function(){
    async.parallel({
        createAdmin: model_wraps_errors(User, 'register',
            new User({username: "admin", is_admin: true, groups: ["admin"]}),            /* Group Object */
            "admin"                                                                 /* password */
        ),
        createBootstrap: model_wraps_errors(User, 'register',
            new User({username: "bootstrap", is_admin: false, groups: ["bootstrap"]}),   /* Group Object */
            "bootstrap"                                                             /* password */
        ),
        createGroups: model_wraps_errors(Group, 'create',
            [new Group({groupname: 'admin'}),new Group({groupname: 'bootstrap'})]
        )
    }, function(err, results) {
        if(err)
            throw err;

    });
};