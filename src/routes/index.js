import express from 'express';
import cookieParser from 'cookie-parser';
const router = express.Router();
router.use(cookieParser());


import ItemsRouter from './Items.route.js';
import OrdersRouter from './Order.route.js';
import ReceiptsRouter from './Receipts.route.js';
import UserRouter from './Use.route.js'

router.use('/', [ItemsRouter, OrdersRouter]) // ReceiptsRouter, UserRouter

export default router;
