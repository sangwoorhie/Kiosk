import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(cookieParser());

import ReceiptsController from '../controller/Receipts.controller.js'
const receiptsController = new ReceiptsController();


// 1. 상품 주문 생성 API : POST localhost:3000/api/receipts
router.post('/receipts', receiptsController.buy);


// 2. 상품 주문 수정 API : PUT localhost:3000/api/receipts/:orderCustomerId
router.patch('/receipts/:orderCustomerId', receiptsController.edit)

export default router;