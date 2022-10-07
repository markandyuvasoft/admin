

const adminauth=(req,res,next)=>{

    console.log(req.user.isAdmin);
    if(!req.user.isAdmin){

        return res.status(403).send('you are not admin user')
    }
    else{
        next()
    }
}

export default adminauth;