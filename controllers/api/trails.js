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

 module.exports = router
  