const User = require('../models/user_Schema')

module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile </h1>');
    User.findOne({ _id: req.params.id }).then(user => {
        return res.render('userProfile', {
            title: 'User Profile',
            userProfile : user  
        })
    })
    
}
module.exports.update = function (req, res) {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body)
        .then(user =>{
            req.flash('success',`Your details has updated Successfully!`)
            return res.redirect('back')
        })
    }else{
        req.flash('error',`Unauthorized`)
        return res.status(401).send('Unauthorized')
    }
}
module.exports.signin = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/'+req.user.id)
    }
    return res.render('userSignin', {
        title: 'User Signin'
    })
}

module.exports.signup = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('userSignup', {
        title: 'User Signup'
    })
}
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','logged out Sucessfully!')
        res.redirect('/');
      });
} 
//sigup and create a new user
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back')
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            User.create(req.body).then(user => {
                req.flash('success',`Thanks for Creating Account ${user.name}`)
                return res.redirect('/users/signin')
            }), function (err) {
                console.log(err)
                req.flash('error',err)
            }
        }
        else {
            req.flash('error','Account already Created please Signin')
            return res.redirect('/users/signin')
        }
    }), function (err) {
        console.log(err)
    }
}
//sigin and create a session for user
module.exports.createSession = function (req, res) {
    req.flash('success','logged in Sucessfully!')
    return res.redirect('/users/profile/'+req.user.id)
}