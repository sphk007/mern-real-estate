import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from"./routes/auth.route.js";

import cors from "cors"

dotenv.config();

mongoose.connect(process.env.MONGO).then(( )=>{
    console.log("connected");
}).catch((err)=>{
    console.log("Error" + err);
});

const app=express();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

// app.post('/api/auth/signup',(req,res,next)=>{
//     console.log(req.body)
// })

//middle Ware//
app.use((err,req,res,next)=>{
    
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
app.listen(4000,()=>{
    console.log("Server");
})