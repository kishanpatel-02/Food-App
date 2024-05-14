import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Login User
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found!"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials!"});
        }

        const token = createToken(user._id);

        res.json({success:true,token:token});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while logining!"})
    }
}


// create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}



// Register User
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already exists!"});

        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email!"});
        } 
        if(password.length < 8){
            return res.json({success:false,message:"Password must be atleast 8 characters long!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user = await newUser.save();
        // if(user){
        //    console.log("user created");
        // }
        // else{
        //     console.log("user not created");
        // }
        const token = createToken(user._id);

        return res.json({success:true,token:token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"})
    }
}


export {loginUser,registerUser};