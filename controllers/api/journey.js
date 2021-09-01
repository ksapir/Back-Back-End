const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require("bcryptjs")
require('dotenv').config()
const { check, validationResult } = require("express-validator/check")

const User = require("../../models/User");
const LotrJourney = require("../../models/LotrJourney")
const { db } = require("../../models/User");

let jwsecret = process.env.JWT_SECRET

//GET api/journey/lotr
// Gets all lotr journey
// public
router.get("/lotr", (req,res) =>{
    LotrJourney.find({}).then(lotr => {
        console.log(lotr)
        res.json(lotr)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router