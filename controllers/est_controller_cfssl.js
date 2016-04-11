const EstController = require('./est_controller');
const Cfssl = require('node-cfssl');
const forge = require('node-forge');
const debug = require('debug')('est_controller:cfssl');

var cfssl_cli = new Cfssl();

var EstControllerCfssl = function () {  // implements EstController
    EstController.call(this,EstControllerCfssl);
    EstControllerCfssl._ensureImplements(this);
};


EstControllerCfssl.prototype.get_ca_certificate = function(label, cb){
    cfssl_cli.info(label, function(err, res){
        var derCert;
        if(err){
            return debug("Error get_ca_certificate: "+err), cb(err);
        }

        var ret = {
            certificate: x509_to_pkcs7_pem(res.certificate),
            status: EstControllerCfssl.OK
        };

        cb(err, ret);
    });
};

EstControllerCfssl.prototype.simple_enroll = function(label, csrPem, cb){
    cfssl_cli.sign(csrPem, {label: label}, function(err, res){
        if(err){
            return debug("Error simple_enroll: "+err), cb(err);
        }

        var ret = {
            certificate: x509_to_pkcs7_pem(res.certificate),
            status: EstControllerCfssl.OK
        };
        cb(err, ret);
    })
};

EstControllerCfssl.prototype.simple_reenroll = function(){

};


function x509_to_pkcs7_pem(certificate){
    var cert = forge.pki.certificateFromPem(certificate);
    var p7 = forge.pkcs7.createSignedData();
    p7.addCertificate(cert)
    var pem = forge.pkcs7.messageToPem(p7);

    pem = pem.replace(/\r\n/g,'\n');
    pem = pem.replace(/-----\w+ PKCS7-----\n*/g,'');

    return pem;
}

module.exports = EstControllerCfssl;
