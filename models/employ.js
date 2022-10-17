import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types
var Schema= mongoose.Schema

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
    postedby:{
        type:ObjectId,
        ref:"user1"
            },

},{versionKey: false})

employSchema.set('timestamps',true)

const Employ=mongoose.model('employ',employSchema)

export default Employ