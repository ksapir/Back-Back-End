const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrailSchema = new Schema(
    {
        user: {
            type:Schema.Types.ObjectId,
            ref: "user"
        },
    }
)




const TrailSchema = mongoose.model("favoriteTrails", TrailSchema);


module.exports = Trail