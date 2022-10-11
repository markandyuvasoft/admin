import mongoose from "mongoose";
var Schema= mongoose.Schema
import jwt from 'jsonwebtoken'

// book schema

const userSchema=new mongoose.Schema({

    
    // _id:{
    //     type:Number,
    // },

    name:{
        type:String,
    
        },
        
    email:{
        type:String,
        },
    
    password:{
        type:String
    },
    cpassword:{
        type:String
    },
    phone:{
        type:Number
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    age:Number,
    token:{
        type:String,
        default:''
    },

    isAdmin:
    {
      type:Boolean,
      default:false
    },
    isVarified:{
        type:Number,
        default:0,
    }
})

userSchema.methods.generateTokens = function (){

    const token= jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privatekey')

    return token
}

const User=mongoose.model('user1',userSchema)

export default User