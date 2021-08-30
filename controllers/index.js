const express = require('express');
const { route } = require('./index2');
const router = express.Router();
const apiRoutes = require("./index2")
const frontEndRoutes = require("./frontEndRoutes")


router.use("/api",apiRoutes)
router.use("/", frontEndRoutes);



router.get("/readsessions",(req,res)=>{
    res.json({
        sessions:req.session
    })
})


module.exports = router;