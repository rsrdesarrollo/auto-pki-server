const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CertSigninReq = new Schema({
    csr: String,
    fprint: String,

    cn: String,
    subject_alt_name: [Schema.Types.Mixed],
    public_key: String,

    is_removed: {type: Boolean, default: false},
    is_approved: {type: Boolean, default: false},
    auth_user: String,
    auth_date: Date,
    auth_ip: String,

    reg_date: {type: Date, default: Date.now},
    reg_user: String,
    reg_ip: String
});

CertSigninReq.index({cn: 1, public_key:1});

CertSigninReq.options.toJSON = {
    transform: function (doc, resource, options) {
        var ret = {};

        ret.id = resource._id;
        ret.type = "csrs";

        delete resource._id;
        delete resource.__v;
        delete resource.csr;

        ret.attributes = resource;

        return ret;
    }
}

module.exports = mongoose.model('CertSigninReq', CertSigninReq);

