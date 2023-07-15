import express from "express";
import AuthRouter from "./Routers/authRouter.js";
import dotenv from "dotenv"
import dbConnect from "./Database/DbConnect.js";
import cors from "cors"
import catogaryRouter from "./Routers/CatogaryRouter.js";
import productRouter from "./Routers/ProductRouter.js";
import OrderRouter from "./Routers/OrderRouter.js";

const app = express();

dotenv.config();
//middleWare
app.use(express.json());
app.use(cors());


app.use("/api/v1/auth",AuthRouter);
app.use("/api/v1/catogary",catogaryRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/order",OrderRouter);



app.listen(4500,()=>
{
    dbConnect();
    console.log("Server Running At port 4500")
})