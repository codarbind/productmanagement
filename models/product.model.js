let mongoose = require('../config/database.config')


let ProductSchema = new mongoose.Schema({
    ownerId:{
       type: mongoose.Schema.Types.ObjectId,
    },
    imageUrl: {
      type:String
      ,required : true
    }
   ,name: {
             type:String
             ,required : true
           }
   ,address: {
               type:String
               ,required:true
             }
   ,createdAt:{
             type: Date
             ,default: Date.now
             ,required:true

             }
   ,updateAt:{
               type:Date
               ,default: Date.now
               ,required:true
             }              
 })


const Product = mongoose.model(
  "Product",
  ProductSchema
);


module.exports = Product;
