const Comment = require('../models/comments')
const Post = require('../models/post')
const user = require('../models/user_Schema')

module.exports.createComment = async function (req, res) {
    try{
        let post = await Post.findById(req.body.post)
        if(post){
          let comment =  await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,

            })
            let postUser = await user.findById(post.user)
            if(comment){
                post.comments.push(comment._id)
                post.save()
                req.flash('success',`You commented on ${postUser.name}`)
            }
            return res.redirect('back')
        }
    }catch(err){
        console.log('Error'+err);
        req.flash('error',err)
        return res.redirect('back')
    }
    // Post.findById(req.body.post).then(post => {
    //     if (post) {
            // Comment.create({
            //     content: req.body.content,
            //     post: req.body.post,
            //     user: req.user._id,

            // }).then(comment => {
    //             post.comments.push(comment._id)
    //             post.save()
    //             return res.redirect('back')
    //         })
    //     }
    // })
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id).then(comment => {
        if (comment.user.toString() === req.user._id.toString()) {
            var postId = comment.post
            comment.deleteOne()
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).then(post => {
                req.flash('success','Your Comment has deleted')
                return res.redirect('back')
            })
        } else {
            req.flash('error', 'You are not authorized to delete this comment')
            return res.redirect('back')
        }
    })
}                                        