const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// class Fellowship extends Model{};


const FellowshipSchema = new Schema(
    {
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




const Fellowship = mongoose.model("fellowship", FellowshipSchema);


module.exports = Fellowship