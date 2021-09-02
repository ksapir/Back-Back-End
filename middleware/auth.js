const jwt = require("jsonwebtoken");
const config = require("config")
require("dotenv").config()

let jwsecret = process.env.JWT_SECRET

module.exports = function(req,res,next) {
    //get token from header
console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];

    console.log(token)
  

    //check if no token
    if (!token){
       return res.status(401).json({msg: "no token, auth denied"})
    }
 console.log(jwsecret)
    //verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.user;
       
        console.log(decoded)
        next()
    } catch(err){
        console.log(err)
        res.status(401).json({msg: "token not valid"})
        
    }
}