const mongoose = require("mongoose");


const Schema = mongoose.Schema;




const PostSchema = new Schema(
    {
        distance:{
            type:Number
        },
        body:{
            type: String,
            allowNull: false

        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)


const Post = mongoose.model("Post", PostSchema);

module.exports = Post