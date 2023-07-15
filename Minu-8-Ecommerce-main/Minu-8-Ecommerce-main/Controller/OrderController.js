import orderModel from "../Models/OrderModel.js";
import ProductModel from "../Models/ProductsModel.js";

export const createOrder = async(req,res)=>
{
    const {cart,address} = req.body;
    if(!cart?.length)
    {
        return res.send({
            succes:false,
            message:"Cannot Place Empty Order"
        })
    }
    if(!address)
    {
        return res.send({
            succes:false,
            message:"Address Required"
        })
    }
    const user = req.user._id;
    try {
        const orders = await Promise.all(
            cart.map((item)=>
            {
                const order = new orderModel({
                    userId:user,
                    product:item._id,
                    address,
                })
                return order.save();
            })
        )
        res.send({
            succes:true,
            message:"Order Place Succes",
            orders,
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            succes:false,
            message:"something went wrong",
        })
    }

}
export const getUserOrder = async(req,res)=>
{
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({userId});
        res.send({
            succes:true,
            message:"order fetched succes",
            orders,
        })
        // const products = await Promise.all(orders.map((item)=>
        // {
        //     return ProductModel.findById(item.product).select("-photo");
        // }))
        // res.send({
        //     succes:true,
        //     message:"Order Fetched",
        //     products,
        // })
        
    } catch (error) {
        console.log(error)
        res.send({
            succes:false,
            message:"something went wrong"
        })
    }
}
export const getAllOrders = async(req,res)=>
{
    try {
        const orders = await orderModel.find();
        res.send({
            succes:true,
            message:"All Order Fetched",
            orders,
        })
        
        
    } catch (error) {
        res.send({
            succes:false,
            message:"Something went wrong"
        })
    }
}
export const changeOrderStatus = async(req,res)=>
{
    const {status} = req.body;

    if(!status)
    {
        return res.send({
            succes:false,
            message:"Status is required"
        })
    }
    const id = req.params.id;
    try {
        const order = await orderModel.findByIdAndUpdate(id,{$set:{
            status,
        }})
        res.send({
            succes:true,
            message:"Order Status Changed"
        })
        

    } catch (error) {
        res.send({
            succes:false,
            message:"Something went wrong"
        })
    }
}