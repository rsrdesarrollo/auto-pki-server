const EstController = require('./est_controller');
const Cfssl = require('node-cfssl');
const openssl = require('openssl-wrapper');
const temp = require("temp");
const fs = require("fs");

var cfssl_cli = new Cfssl();

function pem_to_pkcs7(pem, cb){
    var temp_file = temp.openSync("pem_to_p7b");
    fs.writeSync(temp_file.fd, pem);
    fs.closeSync(temp_file.fd);

    //openssl crl2pkcs7 -nocrl -certfile certificate.cer -outform DER
    openssl.exec('crl2pkcs7', {nocrl:true, certfile:temp_file.path, outform:"DER"},function(err, buff){
        cb(err, buff);
        fs.unlink(temp_file.path);
    })
}

var EstControllerCfssl = function () {  // implements EstController
    EstController.ensureImplements(this);
};

EstControllerCfssl.prototype.get_ca_certificate = function(tag, cb){
    cfssl_cli.info(tag, function(err, res){
        var derCert;
        if(!err){

            derCert = pem_to_pkcs7(res.certificate, function(err, res){
                cb(err,res);
            });
        }else {
            cb(err);
        }
    });
};

EstControllerCfssl.prototype.simple_enroll = function(){

};

EstControllerCfssl.prototype.simple_reenroll = function(){

};


module.exports = EstControllerCfssl;
