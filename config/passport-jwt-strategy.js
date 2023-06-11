const passport  = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/user_Schema');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretKey'
}
passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    let user = await User.findById(jwt_payload._id)
    if(user){
        return done(null,user)
    }else{
        return done(null,false)
    }
}))
module.exports = passport;