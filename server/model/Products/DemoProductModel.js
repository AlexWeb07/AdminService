const mongoose=require('mongoose');

const DemoProductSchema=new mongoose.Schema({
    title:String,
    desc:String,
    img:String,
    mrp:Number,
    price:Number,
    accepted:{
        type:Number,
        default:99
    },
    userId:{
        type:String,
        default:"dfjgjhd"
    }
})

const DemoProductModel=new mongoose.model('demoProduct',DemoProductSchema);

module.exports=DemoProductModel;