import jwt from 'jsonwebtoken'


const checkauth=(req,res,next)=>{

    const token = req.header('Authorization')

    if(!token){

        return res.status(401).send({error:'only authorised person'})
    }

    try{

        const decodeToken = jwt.verify(token,'privatekey')

        req.user = decodeToken

        next()

    }catch(e){

        return res.status(401).send({error:'wrong token'})
    }

}

export default checkauth;