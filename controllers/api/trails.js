const express = require('express');
const router = express.Router();

const Trail = require('../../models/Trail')

// Gets all trails
router.get("/", (req,res) =>{
   Trail.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(data)
    }
})
})



router.get("/location", (req,res) =>{
  Trail.find({}, (err, data) => {
   if (err) {
     console.log(err)
   } else {
     return res.json(data)
   }
})
})

// find by location
// router.get("/location", (req, res) => {
//   Trail.findAll().then(location =>{
//     res.json(location)
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json()
//   })

// })

// router.get("/:location", (req,res) =>{
//   const location = req.params.location
//   Trail.findById(location), (err, data) => {
//    if (err) {
//      console.log(err)
//      return res.send(err)
//    } else {
//      return res.json(data)
//    }
// }})

//user has favorite trails

//see all fave trails

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
  