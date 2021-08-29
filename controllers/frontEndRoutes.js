const express = require('express');
const router = express.Router();
const db = require('../models');
const withAuth = require('../utils/auth');
const User = require("../models/User.js")

//get all

//login
//needs sessions ans tokens
router.post("/login", (req,res) =>{
  console.log("login")
  User.findOne({
    username:req.body.username,
    password: req.body.password
  }).then(dbUser => {
    const db = await mongoose.createConnection(mongodbUri, { useUnifiedTopology: true, useNewUrlParser: true });
  const session = await db.startSession();
  })
  .then(dbUser => {
    res.json(dbUser)
  }).catch(err => {
    res.status(404).json(err);
  });

  })

//logout
// ending the session
router.get("/logout", (req,res)=>{


})


//sign up
router.post("/signUp", (req,res) =>{
  console.log("signup")
    User.create(req.body)
    .then(dbUser => {
      res.json(dbUser)
    }).catch(err => {
      res.status(404).json(err);
    });
})

// Session route to check if logged in
router.get("/session",(req,res)=>{
    res.json({
        sessionData:req.session   
    })
  })

  //get profile by id


  module.exports = router