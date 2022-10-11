import mongoose from "mongoose";
var Schema= mongoose.Schema

// book schema

const employSchema=new mongoose.Schema({

      
    // _id:{
    //     type:Number,
    // },

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