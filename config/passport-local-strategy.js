const passport = require('passport')
const user = require('../models/user_Schema')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user_Schema')

//authentication using passport

passport.use(new LocalStrategy({ usernameField: "email", passReqToCallback: true }, function (req,email, password, done) { 
    User.findOne({ email: email }).then(user => {
        if (!user || user.password != password) {
            req.flash('error','user not found or Invalid userName and Password')
            return done(null ,false)
        }
        return done(null ,user)
    }),function(err){
        console.log(err)
    }
}))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
})

//deserializing the user fron the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(user=>{
        return done(null ,user);
    }),function(err){
        console.log(err)
    }
})

//check if the user is authenticated ..... this is Middleware
passport.checkAuthentication = function(req,res,next){
    //if the user is signedin 
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signin')
    
}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport