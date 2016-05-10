const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    groups: [String],
    is_admin: Boolean
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
        is_admin: self.is_admin
    };
};

module.exports = mongoose.model('User', User);