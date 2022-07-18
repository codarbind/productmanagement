const express = require('express')
const router = express.Router()
let {getToken} = require('../middlewares/userauth')
let userRepo = require('../repositories/user.repo')
let {hashedPassword} = require('../utils/hashpassword')

router.post('/auth',getToken,(req,res,next)=>{
    if(!req.user) return res.status(404).json({message:'user not found', success:false})
    return res.status(200).json({success:true, message:'signed in', data:req.user})
   
})

router.post('/create', async (req,res)=>{
    let {email,password,address} = req.body
    if(!email || !password || !address) return res.status(400).json({message:'incomplete registration details', success:false})
   try{ 
    let taken = await userRepo.findByEmail(email)
    if(taken) return res.status(400).json({success:false,message:'email address already exist'})
    let user = await userRepo.create({email,password:hashedPassword(password),address:address.toLowerCase() })
    if (!user) return res.status(400).json({success:false,message:'signup encountered issues'})
    return res.status(200).json({success:true, message:'signed up, kindly log in', data:user})
}catch(err){
    console.log({err})
    return res.status(400).json({success:false,message:`server encountered issues - ${err._message}`})
}
})


module.exports = router;