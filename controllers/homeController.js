const Post = require('../models/post')
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
        return res.render('home', {
            title: 'Home Page',
            Post: Posts
        })
    })
}
// module.export.actionName