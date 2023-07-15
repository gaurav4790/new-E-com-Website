import mongoose from "mongoose";

const catogarySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
})

const CatogaryModel = mongoose.model("catogary",catogarySchema);

export default CatogaryModel;