const express = require("express");
const router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult} = require("express-validator")

const User = require("../../models/User")

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
    let user = await User.findOne({ email });
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
        config.get("jwtSecret"),
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

module.exports = router