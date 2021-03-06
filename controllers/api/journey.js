const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require("bcryptjs")
require('dotenv').config()
const { check, validationResult } = require("express-validator/check")

const User = require("../../models/User");
const Journey = require("../../models/Journey")
const { db } = require("../../models/User");

let jwsecret = process.env.JWT_SECRET

let userMiles = 15

//GET api/journey/lotr
// Gets all lotr journey
// public
router.get("/lotr", (req,res) =>{
    Journey.find({}).then(lotr => {
        console.log(lotr)
        res.json(lotr)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})





//have front end pass the usermiles back to back end
//do linear search
// send back to front end

module.exports = router