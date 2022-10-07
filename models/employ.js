import mongoose from "mongoose";


// book schema

const employSchema=new mongoose.Schema({
    name:{
        type:String,
    
        },
    age:{
        type:Number
    },
    city:{
        type:String
    },  
    salary:{
        type:Number,
        },
})

const Employ=mongoose.model('employ',employSchema)

export default Employ