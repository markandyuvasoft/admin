import  express  from "express";
import _ from 'lodash';
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const authrouter=express.Router()


//post method user register HIDE PASSWORD and BCRYPT PASSWORD START......................................
authrouter.post("/login",async(req,res,next)=>{

    let user = await User.findOne({email:req.body.email})

    if(!user){

    return res.status(404).send('invalid email or password') 
} else{
    const checkpassword = await bcrypt.compare(req.body.password,user.password);

    if(!checkpassword){

        return res.status(404).send('invalid email or password') 
    }

    const token= user.generateTokens()


    res.status(201).send(token)
}
  })
//post method user register HIDE PASSWORD and BCRYPT PASSWORD end......................................

export default authrouter

