import { Router } from 'express';
import cookieParser from 'cookie-parser';
import OrdersController from '../controller/Order.controller.js'
// import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

const ordersController = new OrdersController();

// 1. 상품 발주 API : POST api/order
router.post('/items/:itemId/orders', ordersController.addOrders)

// 2. 상품 발주 수정 API : PUT api/order/:orderId
router.put('/items/:itemId/order/:orderId', ordersController.editOrders)

export default router;