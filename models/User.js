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
        
        journey: [{
            type: Schema.Types.ObjectId,
            ref: 'journey'
        }]

    }
)





const User = mongoose.model("user", UserSchema);

module.exports = User