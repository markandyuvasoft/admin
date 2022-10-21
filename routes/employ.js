import  express  from "express";
import Employ from "../models/employ.js"
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
import User from "../models/user.js"
import moment from 'moment'
const router=express.Router()


//post method start......................................
router.post("/post",checkauth,async(req,res,next)=>{

    const {  name, age ,city, salary ,date,domain} = req.body;

    if(!name || !age || !city || !salary || !domain)
    {
        res.status(400).send({error:"plz fill the data"})
    }else if(age<=18){

        res.status(400).send({error:"only adult user"})
    } else{

        req.user.password= undefined,          // password ko show nhi krwane ke ley
        req.user.email= undefined , req.user.gender= undefined ,req.user.address= undefined , req.user.cpassword= undefined , req.user.token= undefined , req.user.phone= undefined ,req.user.name= undefined,  req.user.token= undefined ,   req.user.tokens= undefined    
      
        const user = new Employ({
            date :moment().format('L'),name,age,city,salary,domain,postedby:req.user         //req.user me user login ki details hai
        })
        
        const userdata = await Employ.findOne({ name:req.body.name}) 

      if (userdata) {
  
        res.status(400).send({ error: "user already exist" })
  
      }else{
          user.save().then(()=>{
              
              res.status(200).send(user)
              
            })
            .catch((err)=>{
                
                res.status(400).send(err)
                
            }) 
        }
    }
  })
//post method end......................................



router.get("/get/:id",checkauth,async(req,res)=>{

    try{
     
    const _id= req.params.id

    const getid= await Employ.findById(_id)

    res.status(200).send(getid)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})

//get method start......................................
router.get("/get",checkauth,async(req,res)=>{

    try{

    const get= await  Employ.find({postedby:req.user._id}) .populate("postedby", "_id name")

    res.status(200).send(get)
    }
    catch(err)
    {
    res.status(400).send(err)
    }
})
//get method end......................................


//ALL USER DATA SHOW START.............................
router.get("/all",[checkauth,adminauth],async(req,res)=>{

    try{

    const get= await Employ.find()

    res.status(200).send(get)
    }
    catch(err)
    {
    res.status(400).send(err)
    }
})
//ALL USER DATA SHOW END.............................

//put method start......................................
router.put("/update/:id",checkauth,async(req,res)=>{

    try{
     
    const _id= req.params.id

    const getid= await Employ.findByIdAndUpdate(_id,req.body,{
    new:true
     })

    res.status(200).send(getid)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})
//put method end......................................

//delete method start......................................
router.delete("/delete/:id",[checkauth,adminauth],async(req,res)=>{

    try{
        const _id= req.params.id

        const del= await Employ.findByIdAndDelete(_id)

        res.status(200).send({success: "deleted user data"})
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})
//delete method end......................................
export default router