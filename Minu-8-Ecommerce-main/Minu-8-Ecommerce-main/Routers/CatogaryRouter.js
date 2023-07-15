import express from "express"
import auth from "../MiddleWare/Auth.js";
import isAdmin from "../MiddleWare/isAdmin.js";
import { addCatogary, deleteCatogary, getAllCatogary } from "../Controller/CatogaryController.js";

const catogaryRouter = express.Router();

catogaryRouter.post("/addcatogary",auth,isAdmin,addCatogary);
catogaryRouter.delete("/delete/:id",auth,isAdmin,deleteCatogary);
catogaryRouter.get("/getallcatogary",auth,isAdmin,getAllCatogary);








export default catogaryRouter;