const debug = require('debug')('ra_controller:mongo');
const forge = require('node-forge');

const CertSigninReq = require('../models/cert_signin_req');
const Client = require('../models/client');
const RAController = require('./_i_ra_controller');

var RAControllerMongo = function () {  // implements RAController
    RAController.call(this, RAControllerMongo);
    RAControllerMongo._ensureImplements(this);
};

RAControllerMongo.prototype.get_registered_csr = function (csr, cb) {
    var pk = forge.pki.publicKeyToPem(csr.publicKey);
    var cn = csr.subject.getField('CN');
    cn = (cn? cn.value: "");

    CertSigninReq.findOne({cn: cn, public_key:pk}, function (err, csr_reg) {
        cb(err, csr_reg);
    });
};

RAControllerMongo.prototype.register_csr = function (user, ip, csr, cb) {

    var pk = forge.pki.publicKeyToPem(csr.publicKey);
    var cn = csr.subject.getField('CN');
    cn = (cn? cn.value: "");

    var extensions = csr.getAttribute({name: 'extensionRequest'}).extensions;
    var altNames = extensions.find(x => x.name === "subjectAltName");

    altNames = (altNames ? altNames.altNames:null);

    Client.findOne({cn:cn}, function (err, client) {
        if(err){
            return debug(err), cb(err);
        }

        if(client){
            return cb("Client already registered")
        }

        var req = new CertSigninReq({
            cn: cn,

            csr: forge.pki.certificationRequestToPem(csr),
            fprint: forge.pki.getPublicKeyFingerprint(
                csr.publicKey,
                {encoding: 'hex', delimiter: ':'}
            ),
            public_key: pk,
            subject_alt_name: altNames,

            reg_user: user,
            reg_ip: ip
        });

        req.save(cb);
    })
};

RAControllerMongo.prototype.approve_csr = function (user, ip, csr, cb) {
    var pk = forge.pki.publicKeyToPem(csr.publicKey);
    var cn = csr.subject.getField('CN');
    cn = (cn? cn.value: "");

    CertSigninReq.findOneAndUpdate(
        {cn: cn, public_key:pk},
        {
            $set: {
                auth_user: user,
                auth_date: Date.now(),
                auth_ip: ip,
                is_approved: true
            }
        },
        cb
    );
};

RAControllerMongo.prototype.delete_csr = function (csr, cb) {
    var pk = forge.pki.publicKeyToPem(csr.publicKey);
    var cn = csr.subject.getField('CN');
    cn = (cn? cn.value: "");

    CertSigninReq.findOne({cn: cn, public_key:pk}).remove().exec(cb);
};

module.exports = RAControllerMongo;
