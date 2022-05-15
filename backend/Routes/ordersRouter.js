import express from "express";
import { getOrders, sendOrder, payOrder, userOrderList, getAllOrders, deleteOrder,  takeBackOrder, sendRecipt, } from "../Controllers/orders.js";

import userAuth from "../Middleware/userAuth.js";


const router_o = express.Router();
router_o.get('/get/:id',userAuth,getOrders)
router_o.get('/userOrderList', userAuth, userOrderList)
router_o.get('/allOrders', userAuth, getAllOrders)
router_o.post('/send',userAuth, sendOrder )
router_o.put('/:id/paid', userAuth, payOrder)
router_o.get('/recipt', sendRecipt)
router_o.put('/update/:id', userAuth, takeBackOrder)
router_o.delete('/delete/:id', userAuth, deleteOrder)


export default router_o;