import express from 'express';
import cookieParser from 'cookie-parser';
const router = express.Router();
router.use(cookieParser());


import ItemsRouter from './Items.route.js';
import OrdersRouter from './Order.route.js';
import ReceiptsRouter from './Receipts.route.js';
import OptionsRouter from './Options.route.js'
// import ManagersRouter from './Managers.route.js';


router.use('/', [ItemsRouter, OrdersRouter, ReceiptsRouter, OptionsRouter])
// router.use('/manager', [ManagersRouter])


export default router;
