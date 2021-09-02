const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require("bcryptjs")
require('dotenv').config()
const { check, validationResult } = require("express-validator/check")

const User = require("../../models/User")

let jwsecret = process.env.JWT_SECRET

//log in
//POST     api/auth
//@desc    auth user and get token
//@access  Public
router.post("/", [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req)
    //check for errors
    if (!errors.isEmpty()) {
        //if there are errors
        return res.status(400).json({ errors: errors.array() })
    }



    try {
        //see if user exists
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            //send error if already exists
            return res.status(400).json({ ft: [{ msg: "Invalid Credentials" }] })
        }

        //return jsonwebtoken
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const payload = {
            user: {
                id: user.id,
                user: user.username,
                email: user.email,
                userMiles: user.userMiles
            }
        }
        // console.log(jwsecret)
        const token = jwt.sign(
            payload,
            jwsecret,
            { expiresIn: 360000 })
        res.json({ token, user })



    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }




})

//GET     api/auth
//@desc   get user with auth
//@access Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})


// LOGOUT
//POST    api/authlogout
//@desc   logout
//@access Private

router.post("/logout", auth, async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 1});
        res.json({msg: "logged out"})
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})

module.exports = router