const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const request = require("request")
const config = require("config")
require ('dotenv').config()
const { check, validationResult} = require("express-validator")


const { response } = require("express");

const User = require("../../models/User")
const Post = require("../../models/Post")

let jwsecret = process.env.JWT_SECRET

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
    console.error(err);
    res.status(500).send("Server Error")
}
})
    
//GET   api/post
//@desc   get all posts
//@access Private

router.get("/", async (req,res) => {
    try {
        //sort by newest first
        const post = await Post.find().sort({date: -1})
        res.json(post)
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//GET   api/posts/:id
//@desc   get post by id
//@access Private

router.get("/:id", async (req,res) => {
    try {
        //sort by newest first
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg:"post not found"})
        }

        res.json(post)
    } catch (err) {
        console.error(err.message);
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg:"post not found"})
        }
        res.status(500).send("Server Error")
    }
})

//DELETE   api/posts/:id
//@desc   delete post by id
//@access Private

router.delete("/:id", auth, async (req,res) => {
    try {
        //sort by newest first
        const post = await Post.findById(req.params.id);
       
        //check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:"User not authorized"})
        } 
         console.log("POST", post)
        console.log("USER", req.user)
        if(!post) {
            return res.status(404).json({msg:"post not found"})
        }

        await post.remove()
       
            res.json({msg: "Post removed"})
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId"){
            return res.status(404).json({msg:"post not found"})
        }
        res.status(500).send("Server Error")
    }
})


module.exports = router