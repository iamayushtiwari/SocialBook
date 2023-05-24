const Comment = require('../models/comments')
const Post = require('../models/post')

module.exports.createComment = function(req, res){
     Post.findById(req.body.post).then(post => {
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id,
                
            }).then(comment => {
                post.comments.push(comment._id)
                post.save()
                res.redirect('/')
            })
        }
     })
}