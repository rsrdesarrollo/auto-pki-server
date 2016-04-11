/*
    module imports
 */
var express = require('express');
var EstControllerCfssl = require('../controller/est_controller_cfssl');
var pkcs10 = require('../middleware/pkcs10');

var controller = new EstControllerCfssl();
var router = express.Router();
const conf = require('../conf');

var OPTIONAL_LABEL_REGX='(/:ca_lable)?';

router.get(OPTIONAL_LABEL_REGX+'/cacerts', function(req, res, next) {
    var ca_label = req.param('ca_lable');
    controller.get_ca_certificate(ca_label, function(err, derCert){
        /*
         Content-Type: application/pkcs7-mime
         Content-Transfer-Encoding: base64
         */
        res.set('Content-Type','application/pkcs7-mime');
        res.set('Content-Transfer-Encoding','base64');
        res.send(derCert.toString("base64"));
    });
});

router.post(OPTIONAL_LABEL_REGX+'/simpleenroll', pkcs10, function(req, res, next) {
    console.log(req.param('ca_lable'));
    res.render('index', { title: 'Express' });
});

router.post(OPTIONAL_LABEL_REGX+'/simplereenroll', pkcs10, function(req, res, next) {
    console.log(req.param('ca_lable'));
    res.render('index', { title: 'Express' });
});

module.exports = router;
