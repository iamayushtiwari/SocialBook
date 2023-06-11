const Post = require('../../../models/post')
const Comment = require('../../../models/comments')

module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200,
        {
            "status": 200,
            post: posts

        }
    )
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        if (post.user.toString() == req.user._id.toString()) {

            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
            return res.json(200, {
                "status": 200,
                "message": "Post and Comment Associated with post Deleted!"
            })
        } else {
           return res.json(401, {
                message: 'You can not authorized to delete this Post!'
            })
        }
    } catch (err) {
        console.log(err)
        return res.json(200, {
            "status": 200,
            "message": "Internal Server Error"
        })
    }
}