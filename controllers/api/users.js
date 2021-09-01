const express = require("express");
const router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
require ('dotenv').config()
const { check, validationResult} = require("express-validator")

const User = require("../../models/User")

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
    
    try{
    //see if user exists
    // console.log(req.body.email)
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //send error if already exists
        return res.status(400).json({errors: [ { msg: "User already exists" } ] })
    }
 
    //get users gravatar
    const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
    })

    user = new User({
        username: req.body.username,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
    })
    //encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt)

    //save user to db

    await user.save()

    //return jsonwebtoken

    const payload = {
        user: {
            id: user.id,
            username: req.body.username,
            email: req.body.email,
            avatar: avatar,
        }
    }

    const token = jwt.sign( 
        payload, jwsecret,
        { expiresIn: 360000 },
        )
      res.json({ token, user:payload })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }


   return (
       {msg: "User created!"}
   )

})

module.exports = router