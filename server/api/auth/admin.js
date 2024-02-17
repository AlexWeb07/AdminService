const express= require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Admin=require('../../model/AdminModel')
const jwt=require('jsonwebtoken')
require('dotenv').config();


router.post('/createAdmin',async (req,res)=>{
    const {name,email,password}=req.body;
    const oldAdmin=await Admin.findOne({email});
    if(!oldAdmin){
        const secPassword=await bcrypt.hash(password,10);
        try{
            const admin=new Admin({name,email,password:secPassword});
            await admin.save().then((data)=>{
                res.json({msg:'Admin Created Successfully',admin:data})
            })
        }
        catch(err){
            res.json({msg:'Something went wrong...',error:err})
            console.log(err)
        }
    }
    else{
        res.json({msg:'Email Already Exist...'})
    }
})
router.post('/adminLogin',async (req,res)=>{
    var login=false;
    const {email,password}=req.body;
    const isAdmin =await Admin.findOne({email});
    if(isAdmin){
        try{
            const checkPass=await bcrypt.compare(password,isAdmin.password)
            if(checkPass){
                login=true;
                const data={
                    admin:{
                        id:isAdmin._id,
                        name:isAdmin.name,
                        email:isAdmin.email
                    }
                }
                const authToken=jwt.sign(data,process.env.JWT_SECRET)
                res.send({msg:"Logged in successfully...",authToken,login})
            }
            else{
                res.send({msg:"Incorrect password..."})
            }
        }catch(error){
            res.send({msg:'Something went wrong!! try again...'})
            console.log(error)
        }
    }
    else{
        res.json({msg:'User not found',login})
    }
})

module.exports= router