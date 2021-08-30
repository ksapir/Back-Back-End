const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const request = require("request")
const config = require("config")
const { check, validationResult} = require("express-validator")


const { response } = require("express");

const User = require("../../models/User")
const Post = require("../../models/Post")


//POST    api/post
//@desc   create a post
//@access Private
router.post("/", auth, 
    // check("text", "text is required").not().isEmpty()
  async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(
            {error: errors.array()}
        )
    }

try {
   const user = await User.findById(req.user.id).select("-password");
   console.log(req.body)
    const newPost = new Post ( {
        text: req.body.text,
        distance: req.body.distance,
        avatar: user.avatar,
        user: req.user.id
    })
    console.log(newPost)
    const post = await newPost.save();

    res.json(post)
}
 catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error")
}
})
    



module.exports = router