const Post = require('../models/post')
const User = require('../models/user_Schema')
module.exports.home = function(req,res){
    // return res.end('<h1>Express is up!</h1>');
    // console.log(req.cookies)
    // res.cookie("user_id",60)
    // res.cookie("user_name","admin")

    // Post.find({}).then(Posts =>{
    //     return res.render('home',{
    //         title:'Home Page',
    //         Post:Posts
    //     })
    // })

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .then(Posts => {
       User.find({}).then(users => {
        return res.render('home', {
            title: 'Home Page',
            Post: Posts,
            all_users : users
        })
       })
    })
}
// module.export.actionName