const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// class Fellowship extends Model{};


const FellowshipSchema = new Schema(
    {
        // journey:{
        //         type: _ID
        // },
     name:{   
        type: String
    },
        members:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
       milesToGo:{
           type:Number
       },
       groupMiles: {
           type:Number
       },
    }
)




const Fellowship = mongoose.model("fellowship", FellowshipSchema);


module.exports = Fellowship