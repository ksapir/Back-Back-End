const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const CommentSchema = new Schema(
    {
        body: {
            type: String,
            allowNull: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        date: {
            type: Date,
            default: Date.now
        }

    }
)


const Comment = mongoose.model("comment", CommentSchema);


module.exports = Comment