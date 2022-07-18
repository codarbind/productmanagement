const express = require('express')
const app = express()
require('dotenv').config()
const models = require("./models/user.model");
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/comments", require("./routes/comments"));



let port = process.env.port || 3000
app.listen(port, ()=>console.log('listening at port ', port))



