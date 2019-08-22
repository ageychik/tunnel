require('dotenv').config();
const jwt = require('passport-jwt');
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
// const mongoose = require('mongoose');
// const User = require('../model/User');
const key = process.env.PORT || 'secret';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
};


module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload);
            console.log('asdf')
            // User.findById(jwt_payload._id).then(user => {
            //     if (user) return done(null, user);
            //     return done(null, false);
            // }).catch(err => console.log(err));
        })
    );
};