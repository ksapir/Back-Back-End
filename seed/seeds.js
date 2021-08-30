// // seed data
// const db = require('../config/db.js');
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI")

const { 
    LotrJourney, 
    Trail, 
} = require('../models');

const journeyData = require('./lotrJourney');
const trailData = require('./trailSeeds');

db.once('open', async () => {
    await LotrJourney.deleteMany({});
    await Trail.deleteMany({});

   await LotrJourney.insertMany(journeyData);
   await Trail.insertMany(trailData)

    console.log("Data Seeded!");
    process.exit(0);
});
