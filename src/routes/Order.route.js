import { Router } from 'express';
import cookieParser from 'cookie-parser';

// import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

import OrdersController from '../controller/Order.controller.js'
const ordersController = new OrdersController();

// 1. 상품 발주 생성 API : POST localhost:3000/api/items/:itemId/orders
router.post('/items/:itemId/orders', ordersController.addOrders)


// 2. 상품 발주 수정 API : PUT localhost:3000/api/items/:itemId/order/:orderId
router.put('/items/:itemId/order/:orderId', ordersController.editOrders)


export default router;