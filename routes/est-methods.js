/*
    module imports
 */
var express = require('express');
var router = express.Router();

var OPTIONAL_LABEL_REGX='(/:ca_lable)?';


router.get(OPTIONAL_LABEL_REGX+'/', function(req, res, next) {
    var template = {
        title: 'EST Server1',
        ca_label: req.params['ca_lable']
    };

    res.render('index', template);
});


router.get(OPTIONAL_LABEL_REGX+'/cacertificate', function(req, res, next) {
    console.log(req.param('ca_lable'));
    res.render('index', { title: 'Express' });
});

router.get(OPTIONAL_LABEL_REGX+'/simpleenroll', function(req, res, next) {
    console.log(req.param('ca_lable'));
    res.render('index', { title: 'Express' });
});

router.get(OPTIONAL_LABEL_REGX+'/simplereenroll', function(req, res, next) {
    console.log(req.param('ca_lable'));
    res.render('index', { title: 'Express' });
});

module.exports = router;
