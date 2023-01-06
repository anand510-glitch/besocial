const express=require('express');
const keys = require('./config/keys');
const mongoose=require('mongoose')
const {MongoUri} =require("./config/keys")
const port=process.env.port||5000
var cors = require('cors')
const path=require("path")
const app=express()
app.use(cors())
require("./models/user")
require("./models/post")



app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))


mongoose.connect(MongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
 
})
mongoose.connection.on("connected",()=>{
    console.log("connected");
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
})

app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(port,()=>{
    console.log("server running")
})
