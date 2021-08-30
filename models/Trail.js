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




const Trail = mongoose.model("trail", TrailSchema);


module.exports = Trail