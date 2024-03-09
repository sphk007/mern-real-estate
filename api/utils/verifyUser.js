import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


export const verifyToken=(req,res,next)=>{
    // console.log('Cookie Headers:', req.headers.origin);
    const token =req.cookies.access_token;
    console.log("token",token)
    if(!token){  
        return next(errorHandler(401,"Unauthorized from verify user"));
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Forbidden"));
        console.log(user)
        req.user=user;
        next();
    });
    
     
}