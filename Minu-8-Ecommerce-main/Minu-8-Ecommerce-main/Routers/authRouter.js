import express from "express";
import { addAddress, loginUser, registerUser, sendOtp, verifyNumber,getAddress,
 } from "../Controller/AuthController.js";
import auth from "../MiddleWare/Auth.js";
import isAdmin from "../MiddleWare/isAdmin.js";


const authRouter = express.Router();



authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/verifynumber",auth,sendOtp);
authRouter.get("/numberverified",auth,verifyNumber);
authRouter.post("/addaddress",auth,addAddress);
authRouter.get("/getaddress",auth,getAddress);
authRouter.get("/isadmin",auth,isAdmin,(req,res)=>
{
    res.send({
        succes:true,
        message:"user is admin"
    })
});







export default authRouter;