import ProductModel from "../Models/ProductsModel.js";
import fs from "fs"



export const createProduct = async (req, res) => {
    const { name, description, quantity, price, catogary } = req.body;
    console.log(req.body)
    const productPhoto = req.file;

    switch (true) {
        case !name: {
            return res.send({
                succes: false,
                message: `Name is required`,
            })
        }
        case !description: {
            return res.send({
                succes: false,
                message: `Description is required`,
            })
        }
        case !quantity: {
            return res.send({
                succes: false,
                message: `quantify is required`,
            })
        }
        case !price: {
            return res.send({
                succes: false,
                message: `Price is required`,
            })
        }
        case !productPhoto: {
            return res.send({
                succes: false,
                message: "Photo is required"
            })
        }
        case !catogary: {
            return res.send({
                succes: false,
                message: "catogary is required"
            })
        }
    }

    try {
        const newProduct = ProductModel({
            name,
            quantity,
            price,
            description,
            catogary: catogary,
        })
        newProduct.photo.data = fs.readFileSync(productPhoto.path);
        newProduct.photo.contentType = productPhoto.mimetype;
        await newProduct.save();
        res.send({
            succes: true,
            message: "Product Saved Succes",
            newProduct,
        })



    } catch (error) {
        res.send({
            succes: false,
            message: "something went wrong"
        })
    }
}
export const getPhotoByid = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.findById(id).select("photo");

        res.set("Content-type", product.photo.contentType)
        res.send(product.photo.data)
    } catch (error) {
        // console.log(error)
        res.send({
            succes: false,
            message: "something went wrong"
        })
    }
}
export const getAllProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({}).select("-photo");
        res.send({
            succes: true,
            products,
        })

    } catch (error) {
        res.send({
            succes: false,
            message: "something went wrong",
        })
    }
}
export const getProductByPage = async (req, res) => {
    const page = req.params.page;
    const productPerPage = 6;
    try {
        const products = await ProductModel.find({})
            .skip((page - 1) * productPerPage)
            .limit(productPerPage)
            .select("-photo")
        res.send({
            succes: true,
            message: `Product At page ${page}`,
            products,
        })

    } catch (error) {
        console.log(error)
        res.send({
            succes: false,
            message: "something went wrong"
        })
    }
}
// export const filterProducts = async(req,res)=>
// {
//     const {catogary,price} = req.body;
//     try {
//         const args={};
//         if(catogary?.length)
//         {
//             args.catogary = catogary;
//         }
//         if(price?.length)
//         {
//                 args.price = {$gte:price[0],$lte:price[1]};
//         }
//         console.log(args);
//         const products = await ProductModel.find(args)
//         .select("-photo");
//         res.send({
//             succes:true,
//             message:"Product Find Succes",
//             products,
//         })
//     } catch (error) {
//         console.log(error)
//         res.send({
//             succes:false,
//             message:"something went wrong"
//         })
//     }

// }
export const filterProducts = async (req, res) => {

    try {
        const { catogary, price } = req.body;
        const args = {}
        if (catogary.length) {
            args.catogary = catogary;
        }
        if (price.length) {
            args.price = { $gte: price[0], $lte: price[1] };
        }
        
        const products = await ProductModel.find(args).select("-photo").sort({ price: -1 });
        res.send({
            succes: true,
            message: "Products find succes",
            products,
        })
    } catch (error) {

    }
}

export const totalProductsCount = async (req, res) => {
        try {
            const count = (await ProductModel.find({})).length;
            res.send({
                succes: true,
                message: "all products found",
                count,
            })
        } catch (error) {
            res.send({
                succes: false,
                message: "Something went wrong"
            })
        }
}

export const getProductById = async(req,res)=>
{
    const id = req.params.id;
    try {
        const products = await ProductModel.findById(id).select("-photo ")
        res.send({
            succes:true,
            products,
        })
        

    } catch (error) {
        res.send({
            succes:false,
            message:"something went wrong"
        })
    }
}


