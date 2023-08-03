import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(cookieParser());

import OptionsController from '../controller/Options.controller.js';
const optionsController = new OptionsController();

// 1. 옵션추가 POST : localhost:3000/api/options
router.post('/options', optionsController.addOption);

// 2. 옵션수정 PATCH : localhost:3000/api/options/:optionId
router.patch('/options/:optionId', optionsController.editOption)

// 3. 옵션삭제 1차 DELETE : localhost:3000/api/options/:optionId
router.delete('/options/:optionId', optionsController.deleteOption)

// 4. 옵션삭제 2차 DELETE : localhost:3000/api/response/options/:optionId
router.delete('/response/options/:optionId', optionsController.answerRemoveOption)

export default router;