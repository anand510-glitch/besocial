const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
email:{
type:String,
required:true
},
password:{
type:String,
required:true
},
followers:[{type:ObjectId,red:"User"}],
following:[{type:ObjectId,red:"User"}]

,pic:{
    type:String,
    default:"https://res.cloudinary.com/dalbmlfxj/image/upload/v1672855962/3177440_qvgj4s.png"
}


})

mongoose.model("User",userSchema)