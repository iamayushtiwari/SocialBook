const  mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        refPath:"onModel"
    },
    onModel:{
        type:String,
        enum : ["post","comment"],
        require : true
    }
},{
    timestamps:true,
})
const Like = mongoose.model('Like',likeSchema)
module.exports=Like;