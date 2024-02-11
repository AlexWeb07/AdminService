const express=require('express');
const DemoProduct = require('../model/Products/DemoProductModel');
const Product = require('../model/Products/ProductModel');
const router=express.Router();

router.get('/getAllProducts',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.send({products:products})
    } catch (error) {
        res.send({error})
    }
})
router.get('/getAllDemoProducts', async(req,res)=>{
    try {
        const demoProducts=await DemoProduct.find({});
        res.send({demoProducts})
    } catch (error) {
        res.send({error})
    }
})
router.get('/getAllDemoProducts/:userId',async(req,res)=>{
    const userId = req.params.userId
    try {
        const demoProducts=await DemoProduct.find({userId});
        res.json({DemoProducts:demoProducts})
    } catch (error) {
        res.send({error})
    }
})
router.post('/addDemoProduct',async (req,res)=>{
    const {title,desc,img,mrp,price,userId}=req.body;
    try {
        const demo=new DemoProduct({title,desc,img,mrp,price,userId});
        await demo.save().then((data)=>{
            res.send({msg:"One product submitted...",submitedProduct:data})
        })
    } catch (error) {
        res.send({error})
    }
})
router.put('/accept/:id',async (req,res)=>{
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
router.put('/reject/:id',async (req,res)=>{
    const productId=req.params.id
    try {
        const product = await DemoProduct.findByIdAndUpdate(productId,{$set:{accepted:0}});
        res.send({msg:"One product rejected...",RejectedProduct:product})
    } catch (error) {
        res.send({error})
    }
})


module.exports=router