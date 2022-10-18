import mongoose from 'mongoose'
import User from '../models/user.js'

const adminauth=(req,res,next)=>{

    const {isAdmin} = req.user;
    console.log(req.user.isAdmin);
    if(!req.user.isAdmin){

        return res.status(403).send({error:'you are not admin user'})
    }
    else{
        next()
    }
}

export default adminauth;