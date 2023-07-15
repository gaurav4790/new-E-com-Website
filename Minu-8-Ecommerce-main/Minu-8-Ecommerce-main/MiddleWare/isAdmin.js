import Usermodel from "../Models/UserModel.js";
const isAdmin = async(req,res,next)=>
{
    try {
        const user = await Usermodel.findById(req.user._id);
        if(user.role)
        {
            next();
        }
        else
        {
            res.send({
                succes:false,
                message:"not admin",
            })
        }
        
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong",
            error:error.message
        })
    }

}

export default isAdmin;