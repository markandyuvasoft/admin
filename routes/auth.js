import  express  from "express";
// import _ from 'lodash';
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
import nodemailer from 'nodemailer'
import moment from 'moment'
import dotenv from 'dotenv'

dotenv.config()
const authrouter=express.Router()

//BCRYPT PASSWORD USE THIS METHOD START
const secure = async (password) => {

    try {
      const passwordhash = await bcrypt.hash(password, 10)
      return passwordhash
  
    } catch (error) {
      res.status(400).send({ message: "error" })
    }
  }
  //BCRYPT PASSWORD USE THIS METHOD END
  const createtoken = async (id,res) => {

    try {

        // const tokn = await Jwt.sign({ _id: id }, config.secret)

         const tokn = await jwt.sign({ _id: id }, "privatekey",{

          expiresIn:"24h"
      })

        return tokn 

    } catch (error) {

      res.send("error")
    }
}
//verify mail register time start
const sentverifymail = async(name,email,user_id)=>{

    try {

        const transporter = nodemailer.createTransport({
            port: 465,                     // true for 465, false for other ports
            host: "smtp.gmail.com",
            auth: {
                user: process.env.USER_id,
                pass: process.env.USER_PASS,
            },
            secure: true,
        });
        const mailoptions={

            from: process.env.USER_id,
            to:process.env.USER_id,
            subject:'for email varifiaction',
            html: '<p> hii '+name+', please click to verify <a href="  https://adminaman.herokuapp.com/verify?id='+user_id+'">verify</a>your mail</p>'
        }
        transporter.sendMail(mailoptions, function (err, info) {
            if (err)
                console.log(err)
            else
                res.status(200).send(mailoptions)
        });
    } catch (error) {
     
        res.status(400).send("error")
    }
}



// authrouter.get("/profile", checkauth, async (req, res) => {  
//     const profile = await User.findById(req.user._id).select('-password')// chye to employ wali details find krwao
//     res.status(200).send(profile)
// })
  
authrouter.get("/verify", async(req,res)=>{
    try {
 const update= await  User.updateOne({_id:req.query.id},{ $set:{isVarified:1}})
 
 res.status(200).send({success:"welcome your email is verify"})
    } catch (error) {
        res.status(400).send("err")
    }
})

authrouter.post("/register", async (req, res) => {
  
  const { name, email, password, cpassword,phone,gender, address,age} = req.body

  
    if (!name || !email || !password || !cpassword || !phone || !gender || !address || !age) {
  
      return res.status(422).send({ error: "plz fill the field properly" })
    }
    else if(age<=18){
    
      return res.status(422).send({ error: "only register adult user" })
    }
    else {
  
      const spassword = await secure(req.body.password)
  
      const user = new User({
        name, email,phone,gender,address,
        password: spassword,
        cpassword: spassword,
  })
   
      const userdata = await User.findOne({ email: req.body.email })
  
      if (userdata) {
  
        res.status(400).send({ error: "user already exist" })
  
      } else if (password != cpassword) {
  
        return res.status(422).send({ error: "password are not match" })
      }
      else {

      const userdata1 = await user.save()
  
        // const token = user.generateTokens()
   
        res.status(200).send({ message: "please wait your mail varify by admin" })
       
        sentverifymail(req.body.name, req.body.email, userdata1._id);  // mail bnaya hai vafication ke ley
      }
    }
  });
  
//post method user register HIDE PASSWORD and BCRYPT PASSWORD START......................................
authrouter.post("/login",async(req,res,next)=>{

    const {email,password}=req.body;
    
    if(!email || !password){
    
        res.status(400).send({error:"please fill the proper field "})
    }   
    else{

        let user = await User.findOne({email:req.body.email})
        
        
        //  console.log(Id);
        
        if(!user){
          
          return res.status(404).send({error:"invalid email"}) 
          
        }else if(user.isVarified === 0){
          
          res.status(400).send({error:"not allow by admin"})
          
        }else{
          const checkpassword = await bcrypt.compare(req.body.password,user.password);
          
          if(!checkpassword){
            
            return res.status(404).send({error:"invalid password"}) 
          }
          const token=  await  createtoken(user._id) 
          
          const  date =moment().format('L')
          
          let Id=user._id
          res.status(200).send({success:"😉welcome user..!!",token,Id,date})

}
}
  })
//post method user register HIDE PASSWORD and BCRYPT PASSWORD end......................................



export default authrouter

