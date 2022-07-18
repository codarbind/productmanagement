const express = require('express')
const app = express()
require('dotenv').config()
const models = require("./models/user.model");
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{res.send('welcome to the app')})
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/comments", require("./routes/comments"));

let port = process.env.PORT || 3000
app.listen(port, ()=>console.log('listening at port ', port))