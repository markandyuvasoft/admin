
import mongoose from 'mongoose'
import User from '../models/user.js'
import  Jwt  from 'jsonwebtoken'

const adminauth=(req,res,next)=>{

        const token= req.headers.authorization.split(" ")[1]
        const verify = Jwt.verify(token,'privatekey')
      
        const isAdmin = req.user.isAdmin;
        if(!isAdmin)
        {
            return res.status(403).send({error:'you are not admin user'})
        }else{

            next()
        }
        
}

export default adminauth;
