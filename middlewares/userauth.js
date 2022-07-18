let jwt = require('jsonwebtoken')
let {hashedPassword} = require('../utils/hashpassword')
let privateKey = process.env.JWT_KEY
let userRepo = require('../repositories/user.repo')
let prodRepo = require('../repositories/product.repo')

let getToken = async (req,res,next)=>{

 try{
    
    let authorization = req.headers.authorization;
    if(!authorization) return res.status(400).json({message:'unauthorized access'})
    let auth = new Buffer.from(authorization.split(' ')[1],'base64').toString().split(':');
    let email_supplied = auth[0];
    let password_supplied = auth[1];
    if(!email_supplied || !password_supplied) return res.status(400).json({message:'incomplete sign details'})
    let hashedUserPassword = hashedPassword(password_supplied)

   
        let user_exist = await userRepo.findByEmail(email_supplied,{password:hashedUserPassword})
        if(!user_exist) return next()
        let {email,password,address,_id} = user_exist
        let token = jwt.sign ({email,password,id:_id}, privateKey,{expiresIn:'10h'})
        if(!token) return next()
        let addressKeywords = address.toLowerCase().split(' ')
        let products = await prodRepo.search(addressKeywords)
        console.log({products})
        req.user = {user:user_exist,token}
        return next()
    }catch(err){
        console.log({err})
        return next()
    }

    


}

let verifyToken = async (req,res,next)=>{
  
    try{
    
        let authorization = req.headers.authorization;
        if(!authorization) return res.status(400).json({message:'unauthorized access'})
        let token = authorization.split(' ')[1] 
        let tokenVerified = jwt.verify(token, privateKey)
        if(!tokenVerified) return res.status(400).json({success:false,message:'you need to login again'})
        let newToken = jwt.sign (tokenVerified, privateKey)
        req.user = {...tokenVerified,token:newToken}
        return next()
    }catch(err){
        console.log({err})
        return next()
    }

}

module.exports = {getToken, verifyToken}

