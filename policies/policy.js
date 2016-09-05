const User = require('../models/user');
const config = require('../conf').get_conf();
const HttpStatus = require('http-status-codes');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const TotpStrategy = require('passport-totp').Strategy;

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
            user.jwt = jwt_payload;
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

passport.use(new TotpStrategy(
    function(user, done) {
        return done(null, user.key_2f, 30);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.only_admins = function (req,res,next) {
    if(!req.user.is_admin){
        res.status(HttpStatus.FORBIDDEN).json({
            errors: ["Access Forbidden for current user."]
        });
    }else{
        next();
    }
};

module.exports = passport;

