const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        username : {
            type: String,
            allowNull:false,
            trim: true,
            Unique:true,
            required: "Enter Username"
        },

       
        email:{
            type: String,
            allowNull: false,
            trim: true,
            Unique:true,
            required: "Enter Email"
        },

        password:{
            type: String,
            allowNull: false,
            minLength: 8
      
        },
        
        
        avatar: {
            type: String,
        },
        userMiles:{
            type:Number
        },
        totalMiles :{
            type:Number
        },
       
        post: [{
            type:Schema.Types.ObjectId,
            ref: "post"
        }],
       
        
    }
)





const User = mongoose.model("User", UserSchema);

module.exports = User