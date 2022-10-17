import express from "express";
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
import randomstring from 'randomstring'
import nodemailer from 'nodemailer'
import moment from 'moment'


const adminrouter = express.Router()

//BCRYPT PASSWORD USE THIS METHOD START
const secure2 = async (password) => {

  try {
    const passwordhash = await bcrypt.hash(password, 10)
    return passwordhash

  } catch (error) {
    res.status(400).send({ message: "error" })
  }
}
//BCRYPT PASSWORD USE THIS METHOD END


//ADMIN LOGIN.....................................................................................
adminrouter.post("/admin/login",async (req, res) => {

        
        const email= req.body.email
        const password= req.body.password

        const userdata= await User.findOne({email:email})

        if(userdata){

            const passwordmatch= await bcrypt.compare(password,userdata.password)

            if(passwordmatch){

                if(userdata.isAdmin===false){

                    res.status(400).send({message:"you are not admin"})
                }else{

      const checkpassword = await bcrypt.compare(req.body.password,userdata.password);
          
      const token= userdata.generateTokens()
        
      const date =moment().startOf('day').toString()

      res.status(200).send({message:"welcome admin..!!",token,date}) 
                }

            }else{
                res.status(400).send({message:"please try again"})
            }

        }else{
            res.status(400).send({message:"please try again"})
        }

    
})




export default adminrouter

