import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    product:mongoose.Types.ObjectId,
    status:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed","Processing","Shipped","Delevered","Cancel"]
    },
    address:{
        type:String,
        default:"home"
    }
})

const orderModel = new mongoose.model("order",orderSchema);

export default orderModel