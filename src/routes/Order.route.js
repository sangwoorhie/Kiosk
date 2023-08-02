import { Router } from 'express';
import cookieParser from 'cookie-parser';

// import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

import OrdersController from '../controller/Order.controller.js'
const ordersController = new OrdersController();

// 1. 상품 발주 생성 API : POST localhost:3000/api/items/:itemId/orders
router.post('/items/:itemId/orders', ordersController.addOrders)


// 2. 상품 발주 수정 API : PATCH localhost:3000/api/items/:itemId/order/:orderItemId
router.patch('/items/:itemId/order/:orderItemId', ordersController.editOrders)


export default router;