const express =require('express');
const app=express();

const courseRoute= require("./Routes/Course")
const paymentRoute= require("./Routes/Payment")
const profileRoute= require("./Routes/Profile")
const userRoute= require("./Routes/User")

const dbConnect =require("./Config/Database");
const cloudinaryConnect = require("./Config/Clodinary");
const razorpayConnect = require("./Config/razorpay");

// require("dotenv").config();
const dotenv= require("dotenv");
dotenv.config();
const cookieParser= require("cookie-parser");
const cors =require("cors");    
const fileUpload= require("express-fileupload")

const PORT= process.env.PORT || 4000


// Database Connect
dbConnect();
// MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
       origin:"http://localhost:3000",
       credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/"
    })
)

// Connect to Cloudinary
cloudinaryConnect();

// Declare Route
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/payment",paymentRoute)


app.use("/",(req,res)=>{
    res.send(`<h1>Your Server Start</h1>`)
    return res.json({
        success:true,
        message:"Your server start"
    })
})

app.listen(PORT, ()=>{
    console.log("listening on port",PORT);
})