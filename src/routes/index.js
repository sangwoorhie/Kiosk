import express from 'express';
import cookieParser from 'cookie-parser';
// import router from express.Router();
const router = express.Router();
router.use(cookieParser());


import ItemsRouter from './Items.route.js';
import OrdersRouter from './Order.route.js';
import ReceiptsRouter from './Receipts.route.js';

router.use('/item', [ItemsRouter, OrdersRouter, ReceiptsRouter])

module.exports = router;
