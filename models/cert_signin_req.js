const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CertSigninReq = new Schema({
    signature: Buffer,
    csr: String,
    fprint: String,

    cn: String,
    //emailAddress: String,
    //subjectAltName: [String],

    is_removed: {type: Boolean, default: false},
    is_approved: {type: Boolean, default: false},
    auth_user: String,
    auth_date: Date,
    auth_ip: String,

    reg_date: {type: Date, default: Date.now},
    reg_user: String,
    reg_ip: String
});

CertSigninReq.index({signature: -1});
CertSigninReq.index({signature: -1});

CertSigninReq.options.toJSON = {
    transform: function (doc, resource, options) {
        var ret = {};

        ret.id = resource._id;
        ret.type = "csrs";

        delete resource._id;
        delete resource.__v;
        delete resource.signature;
        delete resource.csr;

        ret.attributes = resource;

        return ret;
    }
}

module.exports = mongoose.model('CertSigninReq', CertSigninReq);

