const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const {Journey} = require('../../models/Journey')

// Gets all trails
router.get("/", (req,res) =>{
  
})

router.post('/profile/:id/:journey/currentwalk', (req,res) => {
    let userId = req.params.id
    let journeyId = req.params.journey
    let userMilesWalked = req.body.userMilesWalked
    db.Journey.findById(journeyId)
    .then(dbJourney => {
        db.Journey.update({id:req.params.id}), {$set: {distance: userMilesWalked + dbJourney.totalMiles}}
        res.json(dbJourney);
      })
      .catch(err => {
        res.json(err);
      });    
})

 module.exports = router
  