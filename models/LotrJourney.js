const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const LotrJourneySchema = new Schema(
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
        
    }
    })



const LotrJourney = mongoose.model("lotrJourney", LotrJourneySchema);


module.exports = LotrJourney