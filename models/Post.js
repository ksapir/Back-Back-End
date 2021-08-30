const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        distance:{
            type:Number
        },
        text:{
            type: String,
            allowNull: false

        },
        date: {
            type: Date,
            default: Date.now
        },
        avatar: {
            type: String
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "user"
        },

    }
)


const Post = mongoose.model("post", PostSchema);

module.exports = Post