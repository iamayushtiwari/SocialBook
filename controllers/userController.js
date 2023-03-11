const User = require('../models/user_Schema')

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id).then(user => {
            if (user) {
                return res.render('userProfile', {
                    title: 'User Profile',
                    user:user
                })
            } else {
                return res.redirect('/users/signin')
            }
        })
    } else {
        return res.redirect('/users/signin')
    }
}
module.exports.signin = function (req, res) {
    return res.render('userSignin', {
        title: 'User Signin'
    })
}

module.exports.signup = function (req, res) {
    return res.render('userSignup', {
        title: 'User Signup'
    })
}
module.exports.signout = function(req,res){ 
    res.clearCookie('user_id')
    
    res.redirect('/users/signin')
}
//sigup and create a new user
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back')
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            User.create(req.body).then(user => {
                return res.redirect('/users/signin')
            }), function (err) {
                console.log(err)
            }
        }
        else {
            return res.redirect('/users/signin')
        }
    }), function (err) {
        console.log(err)
    }
}
//sigin and create a session for user
module.exports.createSession = function (req, res) {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // password validation 
            if (user.password != req.body.password) {
                console.log("password does not matched")
                return res.redirect('back')
            }
            else {
                // create session
                res.cookie('user_id', user.id)
                return res.redirect('/users/profile')
            }
        }
        else {
            console.log("user not found")
            return res.redirect('back');
        }
    })
}