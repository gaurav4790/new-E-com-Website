import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const auth = async(req,res,next)=> 
{
    const {authorization}= req.headers;
    if(authorization && authorization.startsWith("Bearer"))
    {
        const token = authorization.split(" ").at(1);
        const payload =  jwt.verify(token,process.env.secerateKey);
        console.log(payload)
        const id = payload.userId;
        try {
            const user = await UserModel.findById(id);
            if(user)
            {
                req.user = user;
                next()
            }
            else
            {
                res.send({
                    succes:false,
                    message:"unauthorized",
                })
            }
            
        } catch (error) {
            res.send({
                succes:false,
                message:"unauthorized",
            })
        }

    }
    else
    {
        res.send({
            succes:false,
            message:"unauthorized",
        })
    }

}

export default auth