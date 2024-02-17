const express= require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../../model/UserModel')
const jwt=require('jsonwebtoken');
const fetchAdmin = require('../middlewares/fetchAdmin');
require('dotenv').config();


router.post('/createUser',fetchAdmin,async (req,res)=>{
    const {name,email,password}=req.body;
    const oldUser=await User.findOne({email});
    if(!oldUser){
        const salt=await bcrypt.genSalt(10)
        const secPassword=await bcrypt.hash(password,salt);
        try{
            const user=new User({name,email,password:secPassword});
            await user.save().then((data)=>{
                res.json({msg:'User Created Successfully',user:data})
            })
        }
        catch(err){
            res.json({msg:'Something went wrong...'})
            console.log(err)
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
                    user:{
                        id:isUser._id,
                        name:isUser.name,
                        email:isUser.email
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
router.get('/getAllUser',fetchAdmin, async (req,res)=>{
    try {
        const allUser=await User.find({});
        if(allUser){
            res.json({msg:"User List Found",Users:allUser})
        }
        else{
            res.json({msg:"User List can't be fetched, database error",Users:allUser})
        }
        
    } catch (err) {
        res.json({msg:"Some Error Occured..."})
        console.log(err)
        
    }
})
router.put('/updateUser/:id',fetchAdmin,async(req,res)=>{
    const {name,email,password} = req.body;
    const id=req.params.id;
    try {
        const oldUser=await User.findById(id)
        const checkEmail=await User.find({email});
        if(checkEmail.length==0 || oldUser.email==email){
            var newUser;
            if(password!=""){
                const secPassword=await bcrypt.hash(password,10);
                newUser=await User.findByIdAndUpdate(id,{$set:{name,email,secPassword}})
            }
            else newUser=await User.findByIdAndUpdate(id,{$set:{name,email}});
             
            newUser?res.status(200).json({"msg":`One user updated with name as ${name}`}):
                res.json({"msg":"User Updation failed! Try again..."});
        }
        else{
            res.status(409).send({"msg":"Email already taken by another user!! Choose different one.."})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error.."});
        console.log(error);
    }
})
router.delete('/deleteUser/:id',fetchAdmin,async (req,res)=>{
    const id=req.params.id;
    try {
        const checkUser=await User.findById(id);
        if(checkUser){
            User.findByIdAndDelete(id).then(docs=>{
                res.status(200).send({msg:"One user deleted successfully...","user":docs});
            })
        }else{
            res.send({"msg":"User doesn't exist..."})
        }
        
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong.."})
        console.log(error)
        
    }
})

module.exports= router