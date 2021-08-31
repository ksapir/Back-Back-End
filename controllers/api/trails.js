const express = require('express');
const router = express.Router();
// const fs = require('fs')
// const path = require('path')
// const {Journey, db} = require('../../models/Journey')
const Trail = require('../../models/Trail')

// Gets all trails
router.get("/trails", async (req,res) =>{
  await Trail.find({}).then(data => {
      console.log(data)
  return res.json(data)    
}). catch(err => {
    console.log(err)
    return res.json(err)
})
})

// router.post('/profile/:id/:journey/currentwalk', (req,res) => {
//     let userId = req.params.id
//     let journeyId = req.params.journey
//     let userMilesWalked = req.body.userMilesWalked
//     db.Journey.findById(journeyId)
//     .then(dbJourney => {
//         db.Journey.update({id:req.params.id}), {$set: {distance: userMilesWalked + dbJourney.totalMiles}}
//         res.json(dbJourney);
//       })
//       .catch(err => {
//         res.json(err);
//       });    
// })

 module.exports = router
  