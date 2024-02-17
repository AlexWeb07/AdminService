const express= require('express');
var cors= require('cors');
// cors compaitibility

const connectDb=require('./db/ConnectDB')
require('dotenv').config();

const MongoUri=process.env.DB_URL;
connectDb(MongoUri);

// app
const app=express();


// middlewares
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true,limit:"10mb"}))

// Routes
app.use('/api/admin',require('./api/auth/admin'))
app.use('/api/user',require('./api/auth/user'))
app.use('/api/product',require('./api/product'))


app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
})
 
app.use(
    cors({
      origin: "*",
      methods: "POST ,PUT ,GET ,DELETE,HEAD",
      credentials: true,
    })
  );

app.listen(4000,console.log("Server successfully running on port 4000"))

