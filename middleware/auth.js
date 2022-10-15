import Jwt from 'jsonwebtoken'


// const checkauth=(req,res,next)=>{

//     const token = req.header('Authorization')

//     if(!token){

//         return res.status(401).send({error:'only authorised person'})
//     }

//     try{

//         const decodeToken = Jwt.verify(token,'privatekey')

//         req.user = decodeToken

//         next()

//     }catch(e){

//         return res.status(401).send({error:'wrong token'})
//     }

// }
//dfgdgfdgfgfg

const checkauth=(req,res,next)=>{
    
    try{
const token= req.headers.authorization.split(" ")[1]
const verify = Jwt.verify(token,'privatekey')


next()

    }
    catch(error)
    {
        return res.status(401).json({
            msg: 'only access authorised person'
        })
    }
} 




export default checkauth;