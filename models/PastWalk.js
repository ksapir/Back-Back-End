const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const PastWalkSchema = new Schema(
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
        userWalked: {
            type: Number
        },
        avatar: {
            type: String
        }       

    }
)


const PastWalk = mongoose.model("pastwalk", PastWalkSchema);


module.exports = Comment