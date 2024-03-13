import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from"./routes/auth.route.js";
import listRouter from"./routes/list.route.js";
import cookieParser from "cookie-parser";
// import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO).then(( )=>{
    console.log("connected");
}).catch((err)=>{
    console.log("Error" + err);
}); 


const app=express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listRouter);

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
