const express= require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../../model/UserModel')
const jwt=require('jsonwebtoken')
require('dotenv').config();


router.post('/createUser',async (req,res)=>{
    const {name,email,password}=req.body;
    const oldUser=await User.findOne({email});
    if(!oldUser){
        const secPassword=await bcrypt.hash(password,10);
        try{
            const user=new User({name,email,password:secPassword});
            await user.save().then((data)=>{
                res.json({msg:'User Created Successfully',user:data})
            })
        }
        catch(err){
            res.json({msg:'Something went wrong...',error:err})
        }
    }
    else{
        res.json({msg:'Email Already Exist...'})
    }
})
router.post('/userLogin', async (req,res)=>{
    var login=false;
    const {email,password}=req.body;
    const isUser = await User.findOne({email});
    if(isUser){
        try{
            const checkPass=await bcrypt.compare(password,isUser.password)
            if(checkPass){
                login=true;
                const data={
                    name:isUser.name,
                    email:isUser.email
                }
                const authToken=jwt.sign(data,process.env.JWT_SECRET)
                res.send({msg:"Logged in successfully...",authToken,login})
            }
            else{
                res.send({msg:"Incorrect password..."})
            }
        }catch(error){
            res.send({msg:'Something went wrong!! try again...'})
        }
    }
    else{
        res.json({msg:'User not found',login})
    }
})
router.get('/getAllUser', async (req,res)=>{
    try {
        const allUser=await User.find({});
        if(allUser){
            res.json({msg:"User List Found",Users:allUser})
        }
        else{
            res.json({msg:"User List can't be fetched, database error",Users:allUser})
        }
        
    } catch (err) {
        res.json({msg:"Some Error Occured.",error:err})
        
    }
})

module.exports= router