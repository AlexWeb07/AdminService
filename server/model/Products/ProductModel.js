const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    title:String,
    desc:String,
    img:String,
    mrp:Number,
    price:Number,
    userId:String
})

const ProductModel=new mongoose.model('product',ProductSchema);

module.exports=ProductModel;