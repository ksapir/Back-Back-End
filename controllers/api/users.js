const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
require("dotenv").config();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");


let jwsecret = process.env.JWT_SECRET;

//POST     api/users
//@desc    register user
//@access  Public
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
      //if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //see if user exists
      console.log(req.body.email);
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //send error if already exists
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        username: req.body.username,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
        // userMiles: req.body.userMiles,
        // userMilesToGo: req.body.userMilesToGo
      });
      //encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);

      //save user to db

      await user.save();

      //return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
          username: req.body.username,
          email: req.body.email,
          avatar: avatar,
        },
      };

      const token = jwt.sign(payload, jwsecret, { expiresIn: 360000 });
      res.json({ token, user: payload });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    return { msg: "User created!" };
  }
);

router.put("/users/:id", async (req, res) => {
  const userData = await User.findOneAndUpdate(
    { _id: req.params.userid },
    { $set: req.body },
    { runValidators: true, new:true }
  )
    .catch((err)=> console.log(err))
    res.json(userData)

 
});

// user signup

// router.post("/signup", (req, res) => {
//     User.create({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email
//     }).then(newUser => {
//         const token = jwt.sign({
//             username:newUser.username,
//             email:newUser.email,
//             id:newUser.id
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn:"2h"
//         })
//         res.json({token, username:newUser })
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({ message: "an error occured", err })
//     })
// })

// user login

// router.post("/login", (req, res) => {
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     }).then(user => {
//         if (!user) {
//             console.log('user not found')
//             return res.status(403).json({ message: "auth failed" })
//         } else if (!bcrypt.compareSync(req.body.password, user.password)) {
//             console.log(req.body.password);
//             console.log("passwords dont match")
//             return res.status(403).json({ message: "auth failed" })
//         } else {
//             const token = jwt.sign({
//                 username:user.username,
//                 email:user.email,
//                 id:user.id
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn:"2h"
//             })
//             res.json({token, user })
//         }
//     })
// })

// router.get("/profile",tokenAuth,(req,res)=>{
//     User.findOne({
//         where:{
//             id:req.user.id
//         },

//     }).then(userData=>{
//         return res.json(userData)
//     }).catch(err=>{
//         console.log(err);
//         return res.status(500).json({message:"error",err})
//     })
// })

module.exports = router;
