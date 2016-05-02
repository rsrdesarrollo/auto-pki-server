const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    _id: String,        // Username
    groups: [String],
    is_admin: Boolean
});

User.plugin(passportLocalMongoose, {
    usernameField: '_id',
    usernameLowerCase: true,
    limitAttempts: true,
    encoding: 'base64'
});

module.exports = mongoose.model('User', User);