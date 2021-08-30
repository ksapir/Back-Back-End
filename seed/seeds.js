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
