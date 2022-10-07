import  express  from "express";
import User from "../models/user.js"
import _ from 'lodash';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
const userrouter=express.Router()


userrouter.get("/profile",checkauth, async (req,res)=>{

    const profile = await User.findById(req.user._id).select('-password')// chye to employ wali details find krwao
    res.send(profile)
})


userrouter.post("/register",async(req,res,next)=>{

    const { name, email, password, cpassword } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !cpassword
    ) 
    {
      return res.status(422).json({ error: " plzz filled the field propraly" });
    }
    try {
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }
       else if (password != cpassword)
       {
        return res.status(422).json({ error: "passord are not maching" });
      } 

      else{
    
        const  user = new User(_.pick(req.body,['name','email','password','isAdmin','cpassword']))
          
        const saltRounds =10
        
        const salt = await bcrypt.genSalt(saltRounds);
        
        user.password = await bcrypt.hash(user.password,saltRounds);
        user.cpassword = await bcrypt.hash(user.cpassword,saltRounds);
        
        await user.save()
        
        const token= user.generateTokens()
    
        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','isAdmin','cpassword']))
        
    }
    } 
    catch (err) {
      console.log(err);
    }
  });


export default userrouter

