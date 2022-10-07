import mongoose from "mongoose";


// book schema

const employSchema=new mongoose.Schema({
    name:{
        type:String,
    
        },
        
    salary:{
        type:String,
        },
})

const Employ=mongoose.model('employ',employSchema)

export default Employ