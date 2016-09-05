const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const randomstring = require('randomstring').generate;
const base32 = require('thirty-two');


var User = new Schema({
    username: String,
    groups: [String],
    is_admin: Boolean,
    needs_2f: {type:Boolean, default: false},
    key_2f: {type: String, default: randomstring}
});

User.plugin(passportLocalMongoose, {
    usernameLowerCase: true,
    limitAttempts: true,
    encoding: 'base64'
});

User.methods.getTokenInfo = function(){
    var self = this;

    return {
        sub: self._id,
        username: self.username,
        groups: self.groups,
        is_admin: self.is_admin,
        need_2f: self.need_2f
    };
};

User.options.toJSON = {
    transform: function (doc, resource, options) {
        var ret = {};

        ret.id = resource._id;
        ret.type = "users";

        delete resource._id;
        delete resource.__v;

        resource.key_2f = base32.encode(resource.key_2f).toString().replace(/=/g,'');

        ret.attributes = resource;

        return ret;
    }
}

User.index({username: 1}, { unique: true });

module.exports = mongoose.model('User', User);