const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JourneySchema = new Schema(
    {
        name:{
            type: String,
        },
        distance:{
            type: Number,
        },
        description: {
            type: String,
        },
        url:{
            type: String,
    },
    milesToGo:{
        type:Number
    }
    })
const Journey = mongoose.model("journey", JourneySchema);
module.exports = Journey