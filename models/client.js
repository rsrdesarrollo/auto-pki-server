const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Client = new Schema({
    cn: String,
    last_cert: String, //PEM
    prev_cert: String, //PEM
    last_beacon: {type: Date, default: Date.now},
    revoked: {type: Boolean, default: false}
});

Client.options.toJSON = {
    transform: function (doc, resource, options) {
        var ret = {};

        ret.id = resource._id;
        ret.type = "clients";

        resource.cert = resource.last_cert;

        delete resource._id;
        delete resource.__v;
        delete resource.last_cert;
        delete resource.prev_cert;

        ret.attributes = resource;

        return ret;
    }
}

Client.index({cn: 1}, {unique: true });

module.exports = mongoose.model('Client', Client);