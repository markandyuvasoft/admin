import mongoose from "mongoose";
var Schema= mongoose.Schema
const {ObjectId}= mongoose.Schema.Types
// book schema

const employSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        },
    age:{
        type:Number
    },
    city:{
        type:String
    },
    date :{ type : Date, default: Date.now },
    // file: 
    //     [Object],
    
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