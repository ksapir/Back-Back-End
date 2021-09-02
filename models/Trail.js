const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrailSchema = new Schema(
    {   
        name: {
            type:String
        },
        parkName: {
            type: String,
        },
        distance: {
            type: String
        },
        location: {
            type: String,
            
            
        },
        state: {
            type: String,
        },
        elevationGain: {
            type: String
        },
        highestPoint: {
            type: String
        },
        dogsAllowed: {
            type: Boolean
        },
        entryFee: {
            type: String
        },
        description: {
            type: String
        },
        url: {
            type: String
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "user"
        },
    }
)




const Trail = mongoose.model("trail", TrailSchema);


module.exports = Trail