const express = require('express');
const router = express.Router();


const LotrJourney = require('../../models/LotrJourney')


// get all breakpoints
router.get("/", (req,res) => {
    LotrJourney.find({}, (err,data) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(data)
        }
    })
})



module.exports = router