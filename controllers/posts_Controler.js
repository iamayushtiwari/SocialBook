const Post = require('../models/post.js')
const Comment = require('../models/comments')

module.exports.createPost = async function (req, res) {
    try {
        await Post.create({ context: req.body.context, user: req.user._id })
        return res.redirect('back')
    } catch (err) {
        console.log(err)
        return;
    }
    // Post.create({context:req.body.context,user:req.user._id}).then(post => {
    //     return res.redirect('back')
    // }),function(err){

    //     console.log(err)
    // }
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        if (post.user.toString() == req.user._id.toString()) {
            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
        }
        return res.redirect('back')
    } catch (err) {
        console.log(err)
        return;
    }
    // Post.findById(req.params.id).then(post => {
    //     //.id means converting the object id into string
    //     if(post.user == req.user.id){
    //         post.deleteOne()
    //         Comment.deleteMany({post: req.params.id }).then(err =>{
    //             return res.redirect('back')
    //         })
    //     }else{
    //         return res.redirect('back')
    //     }
    // })
}