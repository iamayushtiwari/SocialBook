const Comment = require('../models/comments')
const Post = require('../models/post')

module.exports.createComment = function (req, res) {
    Post.findById(req.body.post).then(post => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,

            }).then(comment => {
                post.comments.push(comment._id)
                post.save()
                return res.redirect('back')
            })
        }
    })
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id).then(comment => {
        if (comment.user.toString() === req.user._id.toString()) {
            var postId = comment.post
            comment.deleteOne()
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).then(post => {
                return res.redirect('back')
            })
        } else {
            return res.redirect('back')
        }
    })
}                                        