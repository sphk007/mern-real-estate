import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup =async (req,res,next)=>{
    
    const {username,email,password}=req.body;
    
    const hashpass=bcryptjs.hashSync(password,10);
    
    const newUser=new User({username,email,password:hashpass});
    
    try{
        
        await newUser.save();
        // console.log(req.body)
        res.status(201).json("User created successfully");
    }catch(error){
        next(errorHandler(500,error.message));
    }
   // res.json(newUser);
};




export const signin= async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(404,"User not found"));
        const validpass=bcryptjs.compareSync(password,validUser.password)
        if(!validpass) return next(errorHandler(404,"Invalid credentials"));


        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const{password: pass,...rest}=validUser._doc;

        res.cookie('token1',token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error)
    }

}