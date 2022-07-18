const express = require('express')
const router = express.Router()
let {verifyToken} = require('../middlewares/userauth')
let productRepo = require('../repositories/product.repo')
let userRepo = require('../repositories/user.repo')

router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.post('/new',verifyToken, async (req,res)=>{
    console.log({req:req.body})
    if(!req.user) return res.status(400).json({success:false, message:'kindly log in'})
    try{
    let {ownerId,name,address} = req.body
    if(!ownerId || !name || !address) return res.status(400).json({success:false,message:'provide all necessary product details'})
    let user = await userRepo.findById(ownerId)
    if(!user) return res.status(400).json({success:false, message:'unknown user'})
    let prod = await productRepo.create({ownerId,name,address:address.toLowerCase()})
    if(!prod) res.status(400).json({success:false,message:'uploading issues'})
    return res.status(200).json({success:true, message:'product uploaded', data:prod})
  }catch(err){
    console.log({err})
    return res.status(400).json({success:false,message:`server encountered issues - ${err._message}`})
}
})


module.exports = router;