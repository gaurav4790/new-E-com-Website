import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        default:[],  
    },
    description:{
        type:String,  
    },
    photo:{
        data:Buffer,
        contentType:String,   
    },
    price:{
        type:String,
    },
    quantity:{
        type:String,   
    },
    catogary:{
        type:mongoose.Types.ObjectId,
        ref:"catogary",
    }
})

const ProductModel = mongoose.model("product",productSchema);

export default ProductModel;