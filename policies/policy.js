const User = require('../models/user');
const config = require('../conf').get_conf();

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var jwt_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.tokens.secret,
    issuer: config.tokens.issuer,
    audience: config.tokens.audience
};

var user_mongo_auth_method = User.authenticate();

passport.use(new BasicStrategy(user_mongo_auth_method));
passport.use(new LocalStrategy(user_mongo_auth_method));
passport.use(new JwtStrategy(jwt_opts, function(jwt_payload, done){
    User.findById(jwt_payload.sub, function(err, user){
        if(err){
            return done(err, false);
        }

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;

