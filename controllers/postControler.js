const Post = require('../models/post.js')
module.exports.post = function(req, res){
    return res.end('<h1>post is rendaring</h1>')
}

module.exports.createPost = function(req, res){
    // return res.end('<h1>post is rendaring</h1>')
    Post.create({context:req.body.context,user:req._id}).then(post => {
        return res.redirect('back')
    }),function(err){
        
        console.log(err)
    }
}