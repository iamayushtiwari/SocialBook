const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user_Schema')

passport.use(new googleStrategy({
    clientID: "761566304587-flkjt8b9cpu6ocgn164ahoslf5sibtt7.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ email: profile.emails[0].value })
            console.log(profile)
            if (user) {
                return done(null, user);
            } else {
               user =  await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                return done(null,user)
            }
        } catch (err) {
            console.log("error" + err)
        }
    }
))
module.exports = passport