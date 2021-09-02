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


//GET trail by search
// public

router.get("/:location", async (req,res) => {
    try{
        const trail = await Trail.find({location:req.params.location})
        return res.json(trail)
    }
    catch(error){
        console.error(err.message);
        res.status(500).send("Server Error")
}
})

 module.exports = router
  