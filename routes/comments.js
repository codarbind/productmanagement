const express = require('express')
const router = express.Router()
let {verifyToken} = require('../middlewares/userauth')
let productRepo = require('../repositories/product.repo')
let userRepo = require('../repositories/user.repo')
let commentRepo = require('../repositories/comment.repo')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post('/new',verifyToken, async(req,res,next)=>{
    try{
    let {productId, comment} = req.body
    console.log({req:req.user})
    let {id} = req.user
    let commenterUserId = id
    let com = await commentRepo.create({productId, commenterUserId, comment})
    if(!com) return res.status(400).json({success:false,message:'try posting comment again'})
    return res.status(200).json({success:true,message:'success',data:com}) 

}catch(err){
    console.log({err})
    return res.status(500).json({success:false,message:'comment encountered issues'})
}

})

module.exports = router