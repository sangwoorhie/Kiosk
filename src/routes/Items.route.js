import { Router } from 'express';
// import cookieParser from 'cookie-parser'
import ItemsController from '../controller/Items.controller.js'
import authmiddleware from '../middlewares/middleware'

const router = Router();
// router.use(cookieParser());


const itemsController = new ItemsController();


// 상품 추가 API  : POST api/items
router.post('/items', itemsController.addItems);

// 상품 옵션 추가 API : POST api/items/options
router.post('/items/options', itemsController.optionItems);

// 상품 조회 API : GET api/items
router.get('/items', itemsController.getItems);

// 상품 삭제 API : DELETE api/items/1
router.delete('/items/:itemId', itemsController.deleteItems);

// 상품 수정 API : PATCH api/items/1
router.patch('/items/:itemId', itemsController.patchItems);

export default router;