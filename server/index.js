const express= require('express');
const cors= require('cors');
// cors compaitibility

const connectDb=require('./db/ConnectDB')
require('dotenv').config();

const MongoUri=process.env.DB_URL;
connectDb(MongoUri);

// app
const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if needed)
    optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
  }));


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
 

app.listen(4000,console.log("Server successfully running on port 4000"))

