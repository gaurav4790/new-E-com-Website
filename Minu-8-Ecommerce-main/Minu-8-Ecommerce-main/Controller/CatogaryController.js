import CatogaryModel from "../Models/CatogaryModel.js";

export const addCatogary = async(req,res)=>
{
    const {name} =  req.body;
    if(name)
    {

        try {
            const newCatogary = await CatogaryModel({name:name});
            await newCatogary.save();
            res.send({
                succes:true,
                message:"catogary created",
                newCatogary,
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
            message:"cannot set empty"
        })
    }
    
}
export const deleteCatogary = async(req,res)=>{
    const {id} = req.params;
    try {
        await CatogaryModel.findByIdAndDelete(id);
        res.send({
            succes:true,
            message:"catogary deleted succes",
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            succes:false,
            message:"something went wrong",
            error:error.message
        })
    }
}
export const getAllCatogary = async(req,res)=>
{
    try {
        const catogary = await CatogaryModel.find({});
        res.send({
            succes:true,
            catogary,
        })
        
    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong",
        })
    }
}