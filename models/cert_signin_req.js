const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CertSigninReq = new Schema({
    signature: Buffer,
    csr: String,
    fprint: String,

    is_removed: {type: Boolean, default: false},
    is_approved: {type: Boolean, default: false},
    auth_user: String,
    auth_date: Date,
    auth_ip: String,

    reg_date: {type: Date, default: Date.now},
    reg_user: String,
    reg_ip: String
});

module.exports = mongoose.model('CertSigninReq', CertSigninReq);

