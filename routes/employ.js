import  express  from "express";
import Employ from "../models/employ.js"
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
import User from "../models/user.js"

const router=express.Router()

//post method start......................................
router.post("/post",checkauth,async(req,res,next)=>{

    const { name, age, city,salary } = req.body;

    if(!name || !age || !city || !salary)
    {
        res.status(400).send({error:"plz fill the data"})
    } else{

        const user = new Employ(req.body)

        const get=  Employ.find()           // number id ke ley
        
        user._id = (await get).length+1,    // number id ke ley
      
        user.save().then(()=>{
    
        res.status(201).send(user)
    
        }).catch((err)=>{
      
        res.status(400).send(err)
    
        }) 
    }
  })
//post method end......................................


router.get("/get/:id",checkauth,async(req,res)=>{

    try{
     
        const _id= req.params.id

     const getid= await Employ.findById(_id)

     res.status(201).send(getid)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})


//get method start......................................
router.get("/get",checkauth,async(req,res)=>{

    try{

    const get= await Employ.find()

    res.status(201).send(get)
    }
    catch(err)
    {
    res.status(400).send(err)
    }
})
//get method end......................................


//put method start......................................
router.put("/update/:id",checkauth,async(req,res)=>{

    try{
     
        const _id= req.params.id

     const getid= await Employ.findByIdAndUpdate(_id,req.body,{
        new:true
     })

     res.status(201).send(getid)
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



        res.status(200).send({message: "your data is delete"})
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})
//delete method end......................................
export default router

