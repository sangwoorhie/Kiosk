import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(cookieParser());

import OptionsController from '../controller/Options.controller.js';
const optionsController = new OptionsController();

// 1. 옵션추가 POST : localhost:3000/api/options
router.post('/options', optionsController.addOption);



export default router;