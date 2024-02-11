const mongoose=require('mongoose')

const connectToDb= (uri)=>{
    mongoose.connect(uri,console.log("Database Connected Successfully..."))
}

module.exports=connectToDb;