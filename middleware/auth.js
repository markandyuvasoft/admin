import jwt from 'jsonwebtoken'


const checkauth=(req,res,next)=>{

    const token = req.header('x-auth-token')

    if(!token){

        return res.status(401).send('only auth person')
    }

    try{

        const decodeToken = jwt.verify(token,'privatekey')

        req.user = decodeToken

        next()

    }catch(e){

        return res.status(401).send('wrong token')
    }

}

export default checkauth;