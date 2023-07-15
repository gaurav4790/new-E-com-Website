import mongoose, { mongo } from "mongoose";

const UserSchema  = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    address:{
        type:Array,
        default:[],
    },
    role:{
        type:Boolean,
        default:false,
    },
    isNumberVerify:{
        type:Boolean,
        default:false,
    },
    email:{
       type:String,
       require:true,
    }
})


const UserModel = mongoose.model("user",UserSchema);


export default UserModel;