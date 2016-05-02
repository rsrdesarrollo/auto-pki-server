const User = require('../models/user');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new BasicStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));

User.register(
    new User({_id: "admin", is_admin: true, groups: ["admin"]}),
    "admin",
    function () {
    }
);
User.register(
    new User({_id: "bootstrap", is_admin: false, groups: ["bootstrap"]}),
    "bootstrap",
    function () {
    }
);

module.exports = passport;

