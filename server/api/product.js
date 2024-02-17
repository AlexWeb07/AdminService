const express=require('express');
const DemoProduct = require('../model/Products/DemoProductModel');
const Product = require('../model/Products/ProductModel');
const fetchUser = require('./middlewares/fetchUser');
const fetchAdmin = require('./middlewares/fetchAdmin');
const router=express.Router();

router.get('/getAllProducts',fetchAdmin,async(req,res)=>{
    try {
        const products = await Product.find({});
        res.send({products:products})
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})
router.get('/getAllDemoProducts',fetchAdmin, async(req,res)=>{
    try {
        const demoProducts=await DemoProduct.find({});
        res.send({demoProducts})
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})
router.get('/getAllDemoProductsById',fetchUser,async(req,res)=>{
    const userId = req.user.id
    try {
        const demoProducts=await DemoProduct.find({userId});
        res.json({DemoProducts:demoProducts})
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})
router.post('/addDemoProduct',fetchUser,async (req,res)=>{
    const userId=req.user.id;
    const {title,desc,img,mrp,price}=req.body;
    try {
        const demo=new DemoProduct({title,desc,img,mrp,price,userId});
        await demo.save().then((data)=>{
            res.send({msg:"One product submitted...",submitedProduct:data})
        })
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        console.log(error)
    }
})
router.put('/accept/:id',fetchAdmin,async (req,res)=>{
    const productId=req.params.id
    try {
        const demo= await DemoProduct.findById(productId);
        const {title,desc,img,mrp,price,userId}=demo;
        const product=new Product({title,desc,img,mrp,price,userId});
        await DemoProduct.findByIdAndUpdate(productId,{$set:{accepted:1}});
        await product.save().then((data)=>{
            res.send({msg:"One product accepted...",AcceptedProduct:data})
        })
    } catch (error) {
        res.send({error})
    }
})
router.put('/reject/:id',fetchAdmin,async (req,res)=>{
    const productId=req.params.id
    try {
        const product = await DemoProduct.findByIdAndUpdate(productId,{$set:{accepted:0}});
        res.send({msg:"One product rejected...",RejectedProduct:product})
    } catch (error) {
        res.send({error})
    }
})


module.exports=router