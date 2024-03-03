import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";


export const test=(req,res)=>{
    res.send("Test Route");
};


export const updateUser = async(req,res,next)=>{
    
    console.log(req.user)
    
    // console.log(req.params.id)
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only update your own account!"));

    try {
        if(req.body.password){
            req.body.password =bcrypt.hashSync(req.body.password,10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar : req.body.avatar,
              } , 
            },
            {new:true}
        );
        const {password,...rest}=updateUser._doc;
        res.status(200).json(rest);
    } catch (error) 
    {
        next(error);
    }
};


export const deleteUser=async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only delete your account!!"));
    try {
        await User.findByIdAndDelete(re.params.id);
        res.clearCookie('token1');
        res.status(200).json("User has been deleted...")
    } catch (error) {
        next(error);
    }
}