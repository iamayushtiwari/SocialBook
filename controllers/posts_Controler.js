const Post = require('../models/post.js')
const Comment = require('../models/comments')

module.exports.createPost = function(req, res){
    // return res.end('<h1>create post is rendaring</h1>')
    Post.create({context:req.body.context,user:req.user._id}).then(post => {
        return res.redirect('back')
    }),function(err){
        
        console.log(err)
    }
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then(post => {
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne()
            Comment.deleteMany({post: req.params.id }).then(err =>{
                return res.redirect('back')
            })
        }else{
            return res.redirect('back')
        }
    })
}