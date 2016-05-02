const debug = require('debug')('ra_controller:mongo');
const forge = require('node-forge');

const CertSigninReq = require('../models/cert_signin_req');
const RAController = require('./_i_ra_controller');

var RAControllerMongo = function () {  // implements RAController
    RAController.call(this, RAControllerMongo);
    RAControllerMongo._ensureImplements(this);
};

RAControllerMongo.prototype.get_registered_csr = function (csr, cb) {
    var id = new Buffer(csr.signature);
    CertSigninReq.findById(id, function (err, csr_reg) {
        cb(err, csr_reg);
    });
};

RAControllerMongo.prototype.is_already_signed = function (user, csr, cb) {
    var id = new Buffer(csr.signature);
    CertSigninReq.findById(id, cb);
};


RAControllerMongo.prototype.register_csr = function (user, ip, csr, cb) {

    var id = new Buffer(csr.signature);

    var req = new CertSigninReq({
        _id: id,
        csr: forge.pki.certificationRequestToPem(csr),
        fprint: forge.pki.getPublicKeyFingerprint(
            csr.publicKey,
            {encoding: 'hex', delimiter: ':'}
        ),
        reg_user: user,
        reg_ip: ip
    });

    req.save(cb);

};

RAControllerMongo.prototype.approve_csr = function (user, ip, csr, cb) {
    var id = new Buffer(csr.signature);
    CertSigninReq.findByIdAndUpdate(
        id,
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
    var id = new Buffer(csr.signature);
    CertSigninReq.findByIdAndUpdate(
        id,
        {
            $set: {
                is_deleted: true
            }
        },
        cb
    );
};

module.exports = RAControllerMongo;
