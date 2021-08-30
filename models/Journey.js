const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// class Journey extends Model{};


const JourneySchema = new Schema(
    {   name: {
        type: String
    },
    description: {
        type:String
    },

        members:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        totalMiles: {
            type: Number,
            default: 0,
        }
    }
)




const Journey = mongoose.model("Journey", JourneySchema);


module.exports = Journey