const express = require("express");
const router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")
const config = require("config")
require ('dotenv').config()
const { check, validationResult} = require("express-validator")

const User = require("../../models/User")
const Journey = require("../../models/Journey")
const LotrJourneySeed = require("../../seed/lotrJourney")




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
    
    try{
    //see if user exists
    // console.log(req.body.email)
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



//GET api/users/:id
// find user by id
// Private


router.get("/:id", auth, async (req,res)=> {
    try {
        const user = await User.findById(req.params.id);
console.log(user)
        if(!user) {
            return res.status(404).json({msg:"user not found"})
        }
        res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


//putting miles to user
router.put("/", auth, async (req,res) => {
    try{
        console.log(req.user)
        const miles = await User.findByIdAndUpdate(req.user.id, {
             
                userMiles: req.body.userMiles,
                // userMilesToGo: req.body.userMilesToGo
            
        } , {
            new:true
        });
        
        res.json(miles)
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//GET api/users/journey/:id/
//get journey distance
//private
router.get("/journey/:id", auth, async (req,res)=> {
    try {
        const user = await User.findById(req.params.id);
        const findJourney = LotrJourneySeed;
        // in if statement user.usermiles
        if(!user) {
            return res.status(404).json({msg:"user not found"})
        }
        if (user.userMiles){
            for (let index = 0; index < findJourney.length; index++) {
                const element = findJourney[index].distance
                // Check to see if the index of the given findJourney is equal to the element we are searching for.
                // console.log(findJourney)
                if (user.userMiles > 0 && user.userMiles < 5) {
                    return res.json(findJourney[0]);
                } else if (user.userMiles > 5 && user.userMiles < 32) {
                    return res.json(findJourney[1]);
                } else if (user.userMiles > 32 && user.userMiles < 41) {
                    return res.json(findJourney[2]);
                } else if (user.userMiles > 41 && user.userMiles < 61) {
                    return res.json(findJourney[3]);
                } else if (user.userMiles > 61 && user.userMiles < 70) {
                    return res.json(findJourney[4]);
                } else if (user.userMiles > 70 && user.userMiles < 98) {
                    return res.json(findJourney[5]);
                } else if (user.userMiles > 98 && user.userMiles < 135) {
                    return res.json(findJourney[6]);
                }else if (user.userMiles > 135 && user.userMiles < 241) {
                    return res.json(findJourney[7]);
                }else if (user.userMiles > 241 && user.userMiles < 298) {
                    return res.json(findJourney[8]);
                } else if (user.userMiles > 298 && user.userMiles < 362) {
                    return res.json(findJourney[9]);
                }else if (user.userMiles > 362 && user.userMiles < 393) {
                    return res.json(findJourney[10]);
                }else if (user.userMiles > 393 && user.userMiles < 458) {
                    return res.json(findJourney[11]);
                }else if (user.userMiles > 458 && user.userMiles < 460) {
                    return res.json(findJourney[12]);
                }else if (user.userMiles > 460 && user.userMiles < 585) {
                    return res.json(findJourney[13]);
                }else if (user.userMiles > 585 && user.userMiles < 708) {
                    return res.json(findJourney[14]);
                }else if (user.userMiles > 708 && user.userMiles < 798) {
                    return res.json(findJourney[15]);
                }else if (user.userMiles > 798 && user.userMiles < 839) {
                    return res.json(findJourney[16]);
                }else if (user.userMiles > 839 && user.userMiles < 855) {
                    return res.json(findJourney[17]);
                }else if (user.userMiles > 855 && user.userMiles < 920) {
                    return res.json(findJourney[18]);
                }else if (user.userMiles > 920 && user.userMiles < 1063) {
                    return res.json(findJourney[19]);
                }else if (user.userMiles > 1063 && user.userMiles < 1267) {
                    return res.json(findJourney[20]);
                } else if (user.userMiles > 1267 && user.userMiles < 1288) {
                    return res.json(findJourney[21]);
                }else if (user.userMiles > 1288 && user.userMiles < 1319) {
                    return res.json(findJourney[22]);
                }else if (user.userMiles > 1319 && user.userMiles < 1393) {
                    return res.json(findJourney[23]);
                }else if (user.userMiles > 1393 && user.userMiles < 1418) {
                    return res.json(findJourney[24]);
                }else if (user.userMiles > 1418 && user.userMiles < 1433) {
                    return res.json(findJourney[25]);
                }else if (user.userMiles > 1433 && user.userMiles < 1474) {
                    return res.json(findJourney[26]);
                }else if (user.userMiles > 1474 && user.userMiles < 1532) {
                    return res.json(findJourney[27]);
                }else if (user.userMiles > 1532 && user.userMiles < 1576) {
                    return res.json(findJourney[28]);
                }else if (user.userMiles > 1576 && user.userMiles < 1599) {
                    return res.json(findJourney[29]);
                }else if (user.userMiles > 1599 && user.userMiles < 1600) {
                    return res.json(findJourney[30]);
                }else if (user.userMiles > 1600 && user.userMiles < 1612) {
                    return res.json(findJourney[31]);
                }else if (user.userMiles > 1612 && user.userMiles < 1649) {
                    return res.json(findJourney[32]);
                }else if (user.userMiles > 1649 && user.userMiles < 1721) {
                    return res.json(findJourney[33]);
                }else if (user.userMiles > 1721 && user.userMiles < 1731) {
                    return res.json(findJourney[34]);
                }else if (user.userMiles > 1731 && user.userMiles < 1776) {
                    return res.json(findJourney[35]);
                }else if (user.userMiles > 1776 && user.userMiles < 1780) {
                    return res.json(findJourney[36]);
                }else if (user.userMiles > 1780 && user.userMiles < 1786) {
                    return res.json(findJourney[37]);
                }else if (user.userMiles > 1786 && user.userMiles < 1800) {
                    return res.json(findJourney[38]);
                }else if (user.userMiles > 1800 && user.userMiles < 1906) {
                    return res.json(findJourney[39]);
                } else if (user.userMiles >= 1906 ) {
                    return res.json(findJourney[40]);
                } 

            }
        }
         } catch(error){
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})


module.exports = router
