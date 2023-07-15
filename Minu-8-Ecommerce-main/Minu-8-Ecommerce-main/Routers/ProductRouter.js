import express from 'express';
import { createProduct, filterProducts, getAllProduct, getPhotoByid, getProductById, getProductByPage, totalProductsCount } from '../Controller/ProductController.js';
import path from "path";


import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const productRouter = express.Router();


productRouter.post("/createproduct",upload.single("photo"),createProduct);
productRouter.get("/getphotobyid/:id",getPhotoByid);
productRouter.get("/getallproduct",getAllProduct);
productRouter.get("/getproductbypage/:page",getProductByPage);
productRouter.post("/filterproduct",filterProducts);
productRouter.get("/productscount",totalProductsCount);
productRouter.get("/getproductbyid/:id",getProductById);


















export default productRouter;