import express from "express";
import auth from "../MiddleWare/Auth.js";
import isAdmin from "../MiddleWare/isAdmin.js";
import { changeOrderStatus, createOrder, getAllOrders, getUserOrder } from "../Controller/OrderController.js";

const OrderRouter = express.Router();



OrderRouter.post("/createorder",auth,createOrder);
OrderRouter.get("/getorder",auth,getUserOrder);
OrderRouter.get("/getallorder",getAllOrders);
OrderRouter.put("/changeorderstatus/:id",auth,isAdmin,changeOrderStatus);






export default OrderRouter;