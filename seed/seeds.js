// // // seed data
// // const { Mongoose } = require('mongoose');
// const db = require('../config/db.js');
// // const mongoose = require("mongoose");
// // const { ConnectDB } = require('../config/db')
// // const config = require('config');
// // const db = config.get("mongoURI")
// // connectDB()
// console.log(db)
// const Trail = require('../models/Trail');
// const LotrJourney = require('../models/LotrJourney');

// const journeyData = require('./lotrJourney');
// const trailData = require('./trailSeeds');
// const { Mongoose } = require('mongoose');
// // const connectDB = require("../config/db");

// Mongoose.connect('open', async () => {
// //    try { 
//     await LotrJourney.deleteMany({});
//     await Trail.deleteMany({});

//    await LotrJourney.insertMany(journeyData);
//    await Trail.insertMany(trailData)
// //        {
//     name: "Indian Trail",
//     parkName:"Issaquah Alps",
//     distance:"1.2 miles, one-way",
//     location:"Issaquah",
//     state: "WA",
//     elevationGain:"50 ft",
//     highestPoint:"780 ft",
//     dogsAllowed:true,
//     entryFee:"none",
//     description:"The Indian Trail is one of the main trails running through the western portion of Cougar Mountain.",
//     url:"https://www.wta.org/go-hiking/hikes/indian-trail"
// })

   // console.log("Data Seeded!");

// } catch (err){
//     console.error(err.message);}
//    process.exit(0);
// });

// connectDB()

const db = require('../config/db');
const  LotrJourney  = require('../models/LotrJourney');
const  Trail  = require('../models/Trail');
console.log(db)
const journeyData = require('./lotrJourney.js');
const trailData = require('./trailSeeds.js');

db.once('open', async () => {
  await LotrJourney.deleteMany({});
  await Trail.deleteMany({});

  await LotrJourney.insertMany(journeyData);
  await Trail.insertMany(trailData)

  console.log('Data Seeded!');
  process.exit(0);
});