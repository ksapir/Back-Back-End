const express = require("express");
const router = express.Router();

const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
require ('dotenv').config()
const { check, validationResult} = require("express-validator")

const User = require("../../models/User");
const Fellowship = require("../../models/Fellowship");

let jwsecret = process.env.JWT_SECRET

//POST     api/users
//@desc    register user
//@access  Public
router.post("/", [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check("password", "Please enter password with 6 or more characters").isLength({ min:6 }),
], async (req,res)=> {
    const errors = validationResult(req)
    //check for errors
    if (!errors.isEmpty()) {
        //if there are errors
        return res.status(400).json({ errors: errors.array()})
    }

    const {username, email, password} = req.body
    
    try{
    //see if user exists
    console.log(User)
    let user = await User.findOne({ "email":email });
    if (user) {
        //send error if already exists
        return res.status(400).json({errors: [ { msg: "User already exists" } ] })
    }
 
    //get users gravatar
    const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
    })

    user = new User({
        username,
        email,
        avatar,
        password
    })
    //encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt)

    //save user to db

    await user.save()

    //return jsonwebtoken

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload, 
        config.get(jwsecret),
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token })
        }
        )
  
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }


   

})


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




module.exports = router