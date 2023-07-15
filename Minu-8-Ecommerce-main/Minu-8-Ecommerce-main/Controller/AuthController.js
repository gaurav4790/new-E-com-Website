import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const accountSid = 'ACef06077d4ed0dedf7032ffc8cc5d19de';
const authToken = '35af530137500a44bdcf15761997a2f4';
import twilio from "twilio"
const client = twilio(accountSid,authToken);

export const registerUser = async(req,res)=>
{
    const {name,email,password,phone} = req.body;
    switch(true)
    {
        case !name:{
            return(res.send({succes:false,message:"Name Is required"}));
        }
        case !email:{
            return(res.send({succes:false,message:"Email Is required"}));
        }
        case !password:{
            return(res.send({succes:false,message:"Password Is required"}));
        }
        case !phone:{
            return(res.send({succes:false,message:"Phone Is required"}));
        }
    }
    try {
        const isExistingUser = await UserModel.findOne({$or:[{email:email},{phone:phone}]});
        if(!isExistingUser)
        {
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = new UserModel({
                name,
                email,
                phone,
                password:hashPassword,
            })
            await newUser.save();
            //generatin token
            const token = jwt.sign({userId:newUser._id},process.env.secerateKey,{expiresIn:"5d"});
            res.send({
                succes:true,
                message:"user registered Succes",
                token,
                user:{...newUser._doc,password:null},
            })
        }
        else
        {
            res.send({
                succes:false,
                message:"email or number already registered",
            })
        }
        
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong",
        })
    }
}

export const loginUser = async(req,res)=>
{
    const {username,password} = req.body;
    switch(true)
    {
        case !username:{
            return(res.send({succes:false,mesage:"Username is required"}));
        }
        case !password:{
            return(res.send({succes:false,mesage:"Password is required"}));
        }
    }
    try {
        const user = await UserModel.findOne({$or:[{email:username},{phone:username}]});
        if(user)
        {
            //maching password ;
            const isPasswordCorrect = await bcrypt.compare(password,user.password);
            if(isPasswordCorrect)
            {
                const token = jwt.sign({userId:user._id},process.env.secerateKey,{expiresIn:"5d"});
                res.send({
                    succes:true,
                    message:"User LogeIn succes",
                    token,
                    user:{...user._doc,password:null},
                })
            }
            else
            {
                res.send({
                    succes:false,
                    message:"incorrect password"
                })
            }
        }
        else
        {
            res.send({
                succes:false,
                message:"user not exist"
            })
        }
        
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong"
        })
    }
}
export const sendOtp = async(req,res)=>
{
    const number = req.user.phone;
    try {
        //generating top
        const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
        const message = await client.messages.create({
            body:`otp is ${otp}`,
            to:"+91"+number,
            from:"+16206440872",
        })
        res.send({
            succes:true,
            message:`otp is ${otp}`,
            otp
        })
        
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong"
        })
    }

}
export const verifyNumber = async(req,res)=>
{
    console.log("hey");
   try {
    const user = await UserModel.findById(req.user._id);
    user.isNumberVerify = true;
    await user.save();
    res.send({
        succes:true,
        message:"Number Verfied Succes",
        user,
    })

    
   } catch (error) {
    console.log(error)
    res.send({
        succes:false,
        message:"something went wrong"
    })
   }
}
export const addAddress = async(req,res)=>
{
    const {address} = req.body;
    if(address)
    {
        try {
            const user = await UserModel.findById(req.user._id);
            user.address.push(address);
            await user.save();
            res.send({
                succes:true,
                message:"Address Saved Succes",
                user,
            })
            
        } catch (error) {
            res.send({
                succes:false,
                message:"something went wrong"
            })
        }
    }
    else
    {
        res.send({
           succes:false,
           message:"Empty Address"
        })
    }
}

export const getAddress = async(req,res)=>
{
    try {
        const address = await UserModel.findById(req.user._id)
        .select("address");
        res.send({
            succes:true,
            message:"addres fetched succes",
            address:address.address,
        })
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong"
        })
    }
}
