import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types
var Schema= mongoose.Schema

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
    // image:{
    //     type: String,
    //     },
    image:[Object],
    postedby:{
        type:ObjectId,
        ref:"user1"
        },

},{versionKey: false})

employSchema.set('timestamps',true)

const Employ=mongoose.model('employ',employSchema)

export default Employ