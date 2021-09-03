const db = require('../config/db');
const  Journey  = require('../models/Journey');
const  Trail  = require('../models/Trail');

const journeyData = require('./lotrJourney.js');
const trailData = require('./trailSeeds.js');

db.once('open', async () => {
  await Journey.deleteMany({});
  await Trail.deleteMany({});

  await Journey.insertMany(journeyData);
  await Trail.insertMany(trailData)

  console.log('Data Seeded!');
  process.exit(0);
});
