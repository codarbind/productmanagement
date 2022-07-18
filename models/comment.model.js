let mongoose = require('../config/database.config')


let CommentSchema = new mongoose.Schema({
    productId:{
       type: mongoose.Schema.Types.ObjectId,
    }
   ,commenterUserId: {
             type:String
             ,required : true
           }
   ,comment: {
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


const Comment = mongoose.model(
  "Comment",
  CommentSchema
);


module.exports = Comment;
