const { json } = require('express');
const bycrpt=require("bcrypt")
const express=require('express');
const mongoose=require("mongoose");
const User=mongoose.model("User")
const router=express.Router();
const jwt=require("jsonwebtoken")
const{JWT_SECRET}=require("../config/keys.js")
const requireLogin=require("../middleware/requireLogin")


router.post("/signup",(req,res)=>{
    const{name,email,password,pic}=req.body;
    if(!name||!email||!password){
        res.status(403).json({err:"fill all the fields"})
    }
User.findOne({email:email}).then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"user already exist with this email"})
    }
    bycrpt.hash(password,10)
    .then(hashedpassword=>{
        const user=new User({
            email,
            password:hashedpassword,
            name,
            pic
        })
       user.save()
        .then(user=>{
            res.json({message: "saved successfully"})
            
        }).catch(error=>{
            console.log(error)
         })
        
    })
    
})
 .catch (error=>{
    console.log(error)
 }) 
})

router.post("/login",(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
       return  res.status(422).json({
            error:"please enter email and password"})
    }
    User.findOne({email:email}).then(savedUser=>{
      if(!savedUser){
        return  res.status(422).json({
            error:"invalid user"
        })
      } 
      
      bycrpt.compare(password,savedUser.password).then(doMatch=>{

        if(doMatch){

const token=jwt.sign({_id:savedUser.id},JWT_SECRET)
const{_id,name,email,followers,following,pic}=savedUser

       res.json({
           token,user:{_id,name,email,followers,following,pic}
           
        }) 
    
        console.log({ token, user: { _id, name, email, userName } })
    }
        else{
            return res.status(422).json({error:
                "invalid email or password"
            })
        }
      }).catch(err=>{
        console.log(err)
      })
    })
})

module.exports=router