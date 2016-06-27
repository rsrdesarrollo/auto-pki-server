const CAController = require('./_i_ca_controller');
const Cfssl = require('node-cfssl');
const forge = require('node-forge');
const debug = require('debug')('ca_controller:cfssl');

var cfssl_cli = new Cfssl();

var CAControllerCfssl = function () {  // implements CAController
    CAController.call(this, CAControllerCfssl);
    CAControllerCfssl._ensureImplements(this);
};


CAControllerCfssl.prototype.get_ca_certificate = function (label, cb) {
    cfssl_cli.info(label, function (err, res) {

        if (err) {
            return debug("Error get_ca_certificate: " + err), cb(err);
        }

        var ret = {
            certificate: x509_to_pkcs7_pem([res.certificate]),
            status: CAControllerCfssl.OK
        };

        cb(err, ret);
    });
};

CAControllerCfssl.prototype.sign_csr = function (label, csr_obj, cb) {
    cfssl_cli.sign(csr_obj.csr, {label: label}, function (err, res) {
        if (err) {
            return debug("Error sign_csr: " + err), cb(err);
        }

        var ret = {
            certificate: x509_to_pkcs7_pem([res.certificate]),
            status: CAControllerCfssl.OK
        };
        cb(err, ret);
    })
};


function x509_to_pkcs7_pem(certificates) {
    var p7 = forge.pkcs7.createSignedData();
    for (i=0, len=certificates.length; i < len; i++){
        var cert = forge.pki.certificateFromPem(certificates[i]);
        p7.addCertificate(cert);
    }
    var pem = forge.pkcs7.messageToPem(p7);

    pem = pem.replace(/\r\n/g, '\n');
    pem = pem.replace(/-----\w+ PKCS7-----\n*/g, '');

    return pem;
}

module.exports = CAControllerCfssl;
