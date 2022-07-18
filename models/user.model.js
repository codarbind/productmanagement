let mongoose = require('../config/database.config')

let UserSchema = new mongoose.Schema({
  email: {
           type:String
           ,unique : true
           ,required : true
         }
 ,password:{
             type:String
             ,required: true
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

const User = mongoose.model(
  "User",
  UserSchema
);
module.exports = User;
module.exports = mongoose.model('User', UserSchema);
