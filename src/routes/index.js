import express from 'express';
import cookieParser from 'cookie-parser';
const router = express.Router();
router.use(cookieParser());


import ItemsRouter from './Items.route.js';
import OrdersRouter from './Order.route.js';
// import ReceiptsRouter from './Receipts.route.js';
import CustomersRouter from './Customers.route.js'
// import ManagersRouter from './Managers.route.js'


router.use('/', [ItemsRouter, OrdersRouter]) // ReceiptsRouter
router.use('/customer', [CustomersRouter])
// router.use('/manager', [ManagersRouter])

export default router;
