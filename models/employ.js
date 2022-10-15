import mongoose from "mongoose";
var Schema= mongoose.Schema

// book schema
//Check a branch pull request

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

},{versionKey: false})

employSchema.set('timestamps',true)

const Employ=mongoose.model('employ',employSchema)

export default Employ