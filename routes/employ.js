import  express  from "express";
import Employ from "../models/employ.js"
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
import User from "../models/user.js"
import multer from 'multer'
import moment from 'moment'
const router=express.Router()


// //post method start......................................
// router.post("/post",checkauth,async(req,res,next)=>{

//     const {  name, age ,city, salary ,date,domain} = req.body;

//     if(!name || !age || !city || !salary || !domain)
//     {
//         res.status(400).send({error:"plz fill the data"})
//     }else if(age<=18){

//         res.status(400).send({error:"only adult user"})
//     } else{

//         req.user.password= undefined,          // password ko show nhi krwane ke ley
//         req.user.email= undefined , req.user.gender= undefined ,req.user.address= undefined , req.user.cpassword= undefined , req.user.token= undefined , req.user.phone= undefined ,req.user.name= undefined,  req.user.token= undefined ,   req.user.tokens= undefined    
      
//         const user = new Employ({
//             date :moment().format('L'),name,age,city,salary,domain,postedby:req.user         //req.user me user login ki details hai
//         })
        
//         const userdata = await Employ.findOne({ name:req.body.name}) 

//       if (userdata) {
  
//         res.status(400).send({ error: "user already exist" })
  
//       }else{
//           user.save().then(()=>{
              
//               res.status(200).send(user)
              
//             })
//             .catch((err)=>{
                
//                 res.status(400).send(err)
                
//             }) 
//         }
//     }
//   })
// //post method end......................................

// = multer.diskStorage({
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({  storage: storage})


// router.post("/post", upload.single('image'), checkauth,async (req, res, next) => {

//     try {

//     const {  name, age ,city, salary ,date,domain} = req.body;

//     const image= req.file

//     if(!name || !age || !city || !salary || !domain || !image)
//     {
//         res.status(400).send({error:"plz fill the data"})

//     }else if(age<18 || age>=60){

//         res.status(400).send({error:"your age should be in between 18 to 60 then only you can apply"})
//     }else{
//         req.user.password= undefined,          // password ko show nhi krwane ke ley
//         req.user.email= undefined , req.user.gender= undefined ,req.user.address= undefined , req.user.cpassword= undefined , req.user.token= undefined , req.user.phone= undefined ,req.user.name= undefined,  req.user.token= undefined ,   req.user.tokens= undefined ,req.user.age= undefined   

//         const user = new Employ({
//             date :moment().format('L'),
//             name,age,city,salary,domain,postedby:req.user,         //req.user me user login ki details hai
//             image: req.file.filename,
        
//         });
//         const userdata = await Employ.findOne({ name:req.body.name}) 

//             if (userdata) {
//             res.status(400).send({ error: "user already exist" })
//               }else{

//                   await user.save();
//                   res.status(200).send(user);
//                 }
//     }
// } catch (error) {
//     res.status(400).send({error:"token is invalid user not found"})
// }
        
// })


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({
    storage: storage
  }).single('profile')
  
  router.use('/profile', express.static('upload/images'));
  router.post("/post",checkauth ,async (req, res) => {
    upload(req,res,(err)=>{
  
      if(err)
      {
          console.log(err);
      }else{
        
        try {
          
          const {  name, age ,city, salary ,date,domain} = req.body;
          const image= req.file
  
          if(!name || !age || !city || !salary || !domain || !image){
            res.status(400).send({error:"please fill the data"})
         
          }else{
  
            
            if(age<18 || age>=60){
              
              res.status(400).send({error:"your age should be in between 18 to 60 then only you can apply"})
            }else{
               req.user.password= undefined,          // password ko show nhi krwane ke ley
               req.user.email= undefined , req.user.gender= undefined ,req.user.address= undefined , req.user.cpassword= undefined , req.user.token= undefined , req.user.phone= undefined ,req.user.name= undefined,  req.user.token= undefined ,   req.user.tokens= undefined ,req.user.age= undefined   
              
              const user = new Employ({
                date :moment().format('L'),
                name,age,city,salary,domain,postedby:req.user,         //req.user me user login ki details hai
                
                
                image:{
                  data: req.file.filename,
                  contentType:'image/png',
                  file_url: `https://adminaman.herokuapp.com/profile/${req.file.filename}`,
                }
              });
              user.save()
              .then(()=>res.json({
                success: 1,
                user
              }))
              
            }
          }
        } catch (error) {
            res.status(400).send({error:"token is invalid user not found"})
          }
          }
          })
  })


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