import { Router } from 'express';
import cookieParser from 'cookie-parser'
import ItemsController from '../controller/Items.controller.js'
// import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());


const itemsController = new ItemsController();


// 1. 상품 추가 API  : POST api/items
router.post('/items', itemsController.addItems);

// 2. 상품 옵션 추가 API : POST api/items/options // optionId
router.post('/items/:itemId/options', itemsController.optionItems);

// 3. 상품 목록 조회 API : GET api/items (전체조회/타입별조회)
router.get('/items', itemsController.getItems);

// 4. 상품 수정 API : PUT api/items/1
router.put('/items/:itemId', itemsController.putItems);

// 5. 상품 삭제 1차 API : DELETE api/items/:itemId : 현재 수량이 남아있습니다. 삭제하시겠습니까?’ 확인메세지 (상품수량이 없을경우 즉시삭제)
router.delete('/items/:itemId', itemsController.deleteItems);

// 6. 상품 삭제 2차 API : DELETE api/items/:itemId : 사용자의 대답 ‘예’의 경우 삭제, 반대의 경우 유지.
router.delete('/response/items/:itemId', itemsController.answerRemoveItems);


export default router;